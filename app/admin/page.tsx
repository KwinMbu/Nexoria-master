import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card";
import  Link  from "next/link";
import { buttonVariants } from "@/src/components/ui/button";

export default async function Page() {
    return (
    <Card>
      <CardHeader>
        <CardTitle>URL : /admin</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
      <Link 
        href="/admin/projects/Nexoria" 
        className={buttonVariants({size: "lg", variant: "outline"})}
      >
        Nexoria
      </Link>
      <Link 
        href="/admin/projects/Oteria" 
        className={buttonVariants({size: "lg", variant: "outline"})}
      >
        Oteria
      </Link>
      <Link 
        href="/admin/projects/Publiart" 
        className={buttonVariants({size: "lg", variant: "outline"})}
      >
        Publiart
      </Link>
      </CardContent>
    </Card>
    );
}