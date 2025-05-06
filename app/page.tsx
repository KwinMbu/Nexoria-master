import { buttonVariants } from "@/src/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card";
import  Link  from "next/link";

export default function Home() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>URL : /</CardTitle>
      </CardHeader>
      <CardContent>
      <Link 
        href="/admin" 
        className={buttonVariants({size: "lg", variant: "outline"})}
      >
        /admin
      </Link>
      </CardContent>
    </Card>
  )
}