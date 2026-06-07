import { Leaf, Flame, Heart, Mail, Phone, MapPin } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-stone-50">
      <section className="relative overflow-hidden bg-stone-900 text-white">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -top-24 -right-24 size-96 rounded-full bg-stone-400 blur-3xl" />
          <div className="absolute -bottom-24 -left-24 size-96 rounded-full bg-stone-400 blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
          <p className="text-sm font-medium uppercase tracking-widest text-stone-400">
            关于云栖茗茶
          </p>
          <h1 className="mt-4 text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
            源自山野的
            <br />
            东方味道
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-stone-300">
            云栖茗茶创立于西湖之畔，秉承「以茶为媒，连接自然与生活」的理念，
            致力于为中国茶友甄选来自核心产区的原产地好茶。我们相信，每一片叶子都承载着
            山川雨露的记忆，每一次品饮都是一场与自然的对话。
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-sm font-medium uppercase tracking-widest text-stone-400">
            品牌理念
          </p>
          <h2 className="mt-3 text-3xl font-bold text-stone-900">
            三脉合一，匠心致远
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            我们从原产地直采、古法工艺传承、匠心品质把控三个维度，
            构建了一套完整的茶叶品控体系，确保每一杯茶都值得信赖。
          </p>
        </div>

        <div className="mt-14 grid gap-8 md:grid-cols-3">
          <div className="group rounded-2xl border bg-white p-8 transition-shadow hover:shadow-lg">
            <div className="flex size-14 items-center justify-center rounded-xl bg-stone-100 text-stone-700 transition-colors group-hover:bg-stone-900 group-hover:text-white">
              <Leaf className="size-7" />
            </div>
            <h3 className="mt-6 text-xl font-semibold text-stone-900">
              原产地直采
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              深入西湖龙井、武夷山、安溪、福鼎、勐海等中国十大核心茶产区，
              与当地茶农建立长期合作，从源头把控品质。每一款茶都可追溯至具体山头和茶农。
            </p>
          </div>

          <div className="group rounded-2xl border bg-white p-8 transition-shadow hover:shadow-lg">
            <div className="flex size-14 items-center justify-center rounded-xl bg-stone-100 text-stone-700 transition-colors group-hover:bg-stone-900 group-hover:text-white">
              <Flame className="size-7" />
            </div>
            <h3 className="mt-6 text-xl font-semibold text-stone-900">
              古法工艺
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              尊重每一种茶的传统制作工艺，从手工杀青到炭焙提香，
              我们坚持古法与现代技术的融合，在保留传统风味的同时提升品控标准。
            </p>
          </div>

          <div className="group rounded-2xl border bg-white p-8 transition-shadow hover:shadow-lg">
            <div className="flex size-14 items-center justify-center rounded-xl bg-stone-100 text-stone-700 transition-colors group-hover:bg-stone-900 group-hover:text-white">
              <Heart className="size-7" />
            </div>
            <h3 className="mt-6 text-xl font-semibold text-stone-900">
              匠心品质
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              每批茶叶均经过专业审评师盲评，从外形、香气、汤色、滋味、叶底五个维度
              严格评分。只有评分达到标准的茶叶才能进入云栖茗茶的货架。
            </p>
          </div>
        </div>
      </section>

      <section className="border-t bg-white">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-sm font-medium uppercase tracking-widest text-stone-400">
              我们的团队
            </p>
            <h2 className="mt-3 text-3xl font-bold text-stone-900">
              一群热爱茶的人
            </h2>
          </div>

          <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { name: "李明远", role: "创始人 / 茶叶审评师", desc: "国家一级评茶师，二十年茶行业经验，走遍中国六大茶类核心产区" },
              { name: "苏晓薇", role: "首席产品官", desc: "前知名茶企产品研发总监，精通茶叶拼配与品控体系建设" },
              { name: "陈一帆", role: "供应链负责人", desc: "深耕茶叶供应链十余年，建立了覆盖全国核心产区的直采网络" },
              { name: "周子墨", role: "品牌主理人", desc: "致力于将东方茶文化以现代语言传递给更多年轻消费者" },
            ].map((member) => (
              <div key={member.name} className="text-center">
                <div className="mx-auto size-20 overflow-hidden rounded-full bg-stone-200">
                  <img
                    src={`https://picsum.photos/seed/${member.name}/200/200`}
                    alt={member.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-stone-900">
                  {member.name}
                </h3>
                <p className="mt-1 text-sm font-medium text-stone-500">
                  {member.role}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {member.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t bg-stone-50">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-sm font-medium uppercase tracking-widest text-stone-400">
              联系我们
            </p>
            <h2 className="mt-3 text-3xl font-bold text-stone-900">
              期待与您相遇
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
              无论是产品咨询、商务合作还是茶文化交流，我们都欢迎您的来信来电。
            </p>
          </div>

          <div className="mx-auto mt-14 grid max-w-2xl gap-6 sm:grid-cols-3">
            <div className="flex flex-col items-center rounded-xl border bg-white p-6 text-center">
              <div className="flex size-12 items-center justify-center rounded-full bg-stone-100 text-stone-700">
                <Phone className="size-5" />
              </div>
              <h3 className="mt-4 text-sm font-medium text-stone-900">客服电话</h3>
              <p className="mt-1 text-sm text-muted-foreground">400-888-8888</p>
              <p className="text-xs text-muted-foreground">工作日 9:00 - 21:00</p>
            </div>

            <div className="flex flex-col items-center rounded-xl border bg-white p-6 text-center">
              <div className="flex size-12 items-center justify-center rounded-full bg-stone-100 text-stone-700">
                <Mail className="size-5" />
              </div>
              <h3 className="mt-4 text-sm font-medium text-stone-900">电子邮箱</h3>
              <p className="mt-1 text-sm text-muted-foreground">hello@cloudtea.com</p>
              <p className="text-xs text-muted-foreground">24小时内回复</p>
            </div>

            <div className="flex flex-col items-center rounded-xl border bg-white p-6 text-center">
              <div className="flex size-12 items-center justify-center rounded-full bg-stone-100 text-stone-700">
                <MapPin className="size-5" />
              </div>
              <h3 className="mt-4 text-sm font-medium text-stone-900">公司地址</h3>
              <p className="mt-1 text-sm text-muted-foreground">杭州市西湖区</p>
              <p className="text-xs text-muted-foreground">龙井路 168 号</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
