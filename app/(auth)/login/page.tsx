"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuthStore } from "@/lib/store/auth-store";
import { loginApi, registerApi } from "@/lib/api/auth";
import { mockAccounts } from "@/lib/mock/accounts";
import { toast } from "sonner";
import { Loader2, User, Store, Shield } from "lucide-react";

const loginSchema = z.object({
  username: z.string().min(1, "请输入用户名"),
  password: z.string().min(1, "请输入密码"),
});

const registerSchema = z
  .object({
    username: z.string().min(3, "用户名至少3个字符"),
    password: z.string().min(6, "密码至少6个字符"),
    confirmPassword: z.string().min(1, "请确认密码"),
    phone: z.string().min(11, "请输入正确的手机号").max(11, "请输入正确的手机号"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "两次密码不一致",
    path: ["confirmPassword"],
  });

type LoginForm = z.infer<typeof loginSchema>;
type RegisterForm = z.infer<typeof registerSchema>;

const roleIcons: Record<number, React.ReactNode> = {
  0: <User className="size-4" />,
  1: <Store className="size-4" />,
  2: <Shield className="size-4" />,
};

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { setAuth } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);
  const redirect = searchParams.get("redirect") || "/";

  const loginForm = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: { username: "", password: "" },
  });

  const registerForm = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
    defaultValues: { username: "", password: "", confirmPassword: "", phone: "" },
  });

  const onLogin = async (data: LoginForm) => {
    setIsLoading(true);
    try {
      const result = await loginApi(data);
      if (result.code !== 0) {
        toast.error(result.message);
        setIsLoading(false);
        return;
      }
      const { accessToken, refreshToken, userInfo } = result.data;
      setAuth(accessToken, refreshToken, userInfo);
      document.cookie = `cloudtea-token=${accessToken}; path=/; max-age=86400; SameSite=Lax`;
      toast.success("登录成功");
      router.push(redirect);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "登录失败");
    } finally {
      setIsLoading(false);
    }
  };

  const onRegister = async (data: RegisterForm) => {
    setIsLoading(true);
    try {
      await registerApi({
        username: data.username,
        password: data.password,
        phone: data.phone,
      });
      toast.success("注册成功，请登录");
      registerForm.reset();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "注册失败");
    } finally {
      setIsLoading(false);
    }
  };

  const fillAccount = (username: string, password: string) => {
    loginForm.setValue("username", username);
    loginForm.setValue("password", password);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-stone-50 px-4">
      <div className="w-full max-w-md rounded-2xl border bg-white p-8 shadow-sm">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-foreground">云栖茗茶</h1>
          <p className="mt-1 text-sm text-muted-foreground">欢迎回来</p>
        </div>

        <Tabs defaultValue="login">
          <TabsList className="w-full">
            <TabsTrigger value="login" className="flex-1">
              登录
            </TabsTrigger>
            <TabsTrigger value="register" className="flex-1">
              注册
            </TabsTrigger>
          </TabsList>

          <TabsContent value="login" className="mt-6">
            <form
              onSubmit={loginForm.handleSubmit(onLogin)}
              className="space-y-4"
            >
              <div className="space-y-2">
                <Label htmlFor="login-username">用户名</Label>
                <Input
                  id="login-username"
                  placeholder="请输入用户名"
                  {...loginForm.register("username")}
                />
                {loginForm.formState.errors.username && (
                  <p className="text-xs text-destructive">
                    {loginForm.formState.errors.username.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="login-password">密码</Label>
                <Input
                  id="login-password"
                  type="password"
                  placeholder="请输入密码"
                  {...loginForm.register("password")}
                />
                {loginForm.formState.errors.password && (
                  <p className="text-xs text-destructive">
                    {loginForm.formState.errors.password.message}
                  </p>
                )}
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "登录中..." : "登录"}
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="register" className="mt-6">
            <form
              onSubmit={registerForm.handleSubmit(onRegister)}
              className="space-y-4"
            >
              <div className="space-y-2">
                <Label htmlFor="reg-username">用户名</Label>
                <Input
                  id="reg-username"
                  placeholder="至少3个字符"
                  {...registerForm.register("username")}
                />
                {registerForm.formState.errors.username && (
                  <p className="text-xs text-destructive">
                    {registerForm.formState.errors.username.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="reg-password">密码</Label>
                <Input
                  id="reg-password"
                  type="password"
                  placeholder="至少6个字符"
                  {...registerForm.register("password")}
                />
                {registerForm.formState.errors.password && (
                  <p className="text-xs text-destructive">
                    {registerForm.formState.errors.password.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="reg-confirm">确认密码</Label>
                <Input
                  id="reg-confirm"
                  type="password"
                  placeholder="请再次输入密码"
                  {...registerForm.register("confirmPassword")}
                />
                {registerForm.formState.errors.confirmPassword && (
                  <p className="text-xs text-destructive">
                    {registerForm.formState.errors.confirmPassword.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="reg-phone">手机号</Label>
                <Input
                  id="reg-phone"
                  placeholder="请输入手机号"
                  {...registerForm.register("phone")}
                />
                {registerForm.formState.errors.phone && (
                  <p className="text-xs text-destructive">
                    {registerForm.formState.errors.phone.message}
                  </p>
                )}
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "注册中..." : "注册"}
              </Button>
            </form>
          </TabsContent>
        </Tabs>

        <div className="mt-6 border-t pt-6">
          <p className="mb-3 text-center text-xs font-medium text-muted-foreground">
            演示账号（点击自动填充）
          </p>
          <div className="space-y-2">
            {mockAccounts.map((account) => (
              <button
                key={account.username}
                type="button"
                onClick={() => fillAccount(account.username, account.password)}
                className="flex w-full items-center gap-3 rounded-lg border p-3 text-left transition-colors hover:bg-stone-50"
              >
                <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-stone-100 text-stone-600">
                  {roleIcons[account.role]}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-foreground">
                      {account.username}
                    </span>
                    <span className="rounded-full bg-stone-100 px-2 py-0.5 text-[10px] text-stone-600">
                      {account.roleLabel}
                    </span>
                  </div>
                  <p className="mt-0.5 truncate text-xs text-muted-foreground">
                    {account.description}
                  </p>
                </div>
                <span className="shrink-0 text-xs text-muted-foreground">
                  密码: {account.password}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-stone-50">
          <Loader2 className="size-6 animate-spin text-muted-foreground" />
        </div>
      }
    >
      <LoginContent />
    </Suspense>
  );
}
