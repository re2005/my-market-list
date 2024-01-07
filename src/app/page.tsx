import UiList from '@/components/UiList'
import UiItemInput from "@/components/UiItemInput";

export default function Home() {
  return (
    <section className="flex flex-col items-center justify-between mt-10 lg:mt-20 gap-4 lg:gap-10">
      <UiItemInput/>
      <UiList/>
    </section>
  )
}
