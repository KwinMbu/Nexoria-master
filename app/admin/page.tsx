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
        href="/admin/projects/newproject" 
        className={buttonVariants({size: "lg", variant: "outline"})}
      >
        New Project
      </Link>
      </CardContent>
    </Card>
    );
}