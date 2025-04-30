import { Description } from "app/components/Home/Description"
import { Hero } from "app/components/Home/Hero"

export default function HomeLayout({children}: Readonly<{
    children: React.ReactNode;
  }>){
    return(
        <div>
            <Hero />
            <Description />
            {children}
        </div>
    )
}