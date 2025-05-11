import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card";
import  Link  from "next/link";
import { buttonVariants } from "@/src/components/ui/button";
import { prisma } from "@/src/lib/prisma";

export default async function Page() {
  const projects = await prisma.project.findMany({
    orderBy: {
      createdAt: "desc",
    }
  })
    return (
    <Card>
      <CardHeader>
        <CardTitle>URL : /admin</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        {projects.map((project) => (
            <Card className="p-4" key={project.id}>
            <h3 className="text-lg font-semibold text-primary">{project.project}</h3>
            <p className="text-sm text-muted-foreground mt-[-10px]">{project.description}</p>
            </Card>
      ))}
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