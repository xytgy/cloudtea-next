"use client"

import { useEffect, useState, useCallback } from "react"
import { Search, Plus, UserCheck, UserX, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { EmptyState } from "@/components/shared/empty-state"
import { getUserListApi, addUserApi, updateUserStatusApi } from "@/lib/api/admin"
import { toast } from "sonner"
import type { AdminUser, AdminRole } from "@/lib/mock/admin"

const roleLabel: Record<AdminRole, string> = {
  user: "用户",
  merchant: "商家",
  admin: "管理员",
}

const roleBadgeClass: Record<AdminRole, string> = {
  user: "bg-blue-100 text-blue-700 border-blue-200",
  merchant: "bg-purple-100 text-purple-700 border-purple-200",
  admin: "bg-red-100 text-red-700 border-red-200",
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<AdminUser[]>([])
  const [loading, setLoading] = useState(true)
  const [keyword, setKeyword] = useState("")
  const [addDialog, setAddDialog] = useState(false)
  const [addForm, setAddForm] = useState({
    username: "",
    nickname: "",
    role: "user" as AdminRole,
    phone: "",
    password: "",
  })

  const fetchUsers = useCallback(async (kw?: string) => {
    setLoading(true)
    try {
      const res = await getUserListApi(kw ? { keyword: kw } : undefined)
      if (res.code === 0) setUsers(res.data)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchUsers(keyword)
  }, [fetchUsers, keyword])

  const handleSearch = () => {
    fetchUsers(keyword)
  }

  const handleToggleStatus = async (user: AdminUser) => {
    const newStatus = user.status === "enabled" ? "disabled" : "enabled"
    const res = await updateUserStatusApi({ id: user.id, status: newStatus })
    if (res.code === 0) {
      toast.success(newStatus === "enabled" ? "已启用" : "已禁用")
      fetchUsers(keyword)
    }
  }

  const handleAddUser = async () => {
    if (!addForm.username.trim()) {
      toast.error("请输入用户名")
      return
    }
    if (!addForm.password.trim()) {
      toast.error("请输入密码")
      return
    }
    const res = await addUserApi(addForm)
    if (res.code === 0) {
      toast.success("用户添加成功")
      setAddDialog(false)
      setAddForm({ username: "", nickname: "", role: "user", phone: "", password: "" })
      fetchUsers(keyword)
    }
  }

  return (
    <div className="container mx-auto py-6 px-4">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">用户管理</h1>
        <Button onClick={() => setAddDialog(true)}>
          <Plus className="mr-1.5 size-4" />
          新增用户
        </Button>
      </div>

      <div className="mb-6 flex items-center gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="搜索用户名、昵称或手机号..."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            className="pl-9"
          />
        </div>
        <Button variant="outline" onClick={handleSearch}>
          搜索
        </Button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="size-8 animate-spin" />
        </div>
      ) : users.length === 0 ? (
        <EmptyState title="暂无用户" description="还没有注册用户" />
      ) : (
        <div className="rounded-lg border bg-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">用户名</th>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">昵称</th>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">角色</th>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">手机号</th>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">状态</th>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">操作</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="border-b last:border-b-0 hover:bg-muted/30 transition-colors">
                    <td className="px-4 py-3 font-medium">{user.username}</td>
                    <td className="px-4 py-3 text-muted-foreground">{user.nickname}</td>
                    <td className="px-4 py-3">
                      <Badge
                        variant="outline"
                        className={roleBadgeClass[user.role]}
                      >
                        {roleLabel[user.role]}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">{user.phone}</td>
                    <td className="px-4 py-3">
                      <Badge
                        variant="outline"
                        className={
                          user.status === "enabled"
                            ? "bg-emerald-100 text-emerald-700 border-emerald-200"
                            : "bg-stone-100 text-stone-500 border-stone-200"
                        }
                      >
                        {user.status === "enabled" ? "启用" : "禁用"}
                      </Badge>
                    </td>
                    <td className="px-4 py-3">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleToggleStatus(user)}
                      >
                        {user.status === "enabled" ? (
                          <>
                            <UserX className="mr-1 size-3.5" />
                            禁用
                          </>
                        ) : (
                          <>
                            <UserCheck className="mr-1 size-3.5" />
                            启用
                          </>
                        )}
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <Dialog open={addDialog} onOpenChange={setAddDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>新增用户</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>用户名</Label>
              <Input
                placeholder="请输入用户名"
                value={addForm.username}
                onChange={(e) => setAddForm({ ...addForm, username: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>昵称</Label>
              <Input
                placeholder="请输入昵称"
                value={addForm.nickname}
                onChange={(e) => setAddForm({ ...addForm, nickname: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>角色</Label>
              <Select
                value={addForm.role}
                onValueChange={(val) => setAddForm({ ...addForm, role: val as AdminRole })}
              >
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="user">用户</SelectItem>
                  <SelectItem value="merchant">商家</SelectItem>
                  <SelectItem value="admin">管理员</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>手机号</Label>
              <Input
                placeholder="请输入手机号"
                value={addForm.phone}
                onChange={(e) => setAddForm({ ...addForm, phone: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>密码</Label>
              <Input
                type="password"
                placeholder="请输入密码"
                value={addForm.password}
                onChange={(e) => setAddForm({ ...addForm, password: e.target.value })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setAddDialog(false)}>
              取消
            </Button>
            <Button onClick={handleAddUser}>确认添加</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
