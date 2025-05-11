import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card";
import  Link  from "next/link";
import { buttonVariants } from "@/src/components/ui/button";
import { prisma } from "@/src/lib/prisma";
import { DeleteProjectButton } from "./delete-projects-button";

export default async function Page() {
  const projects = await prisma.project.findMany({
    orderBy: {
      createdAt: "desc",
    }
  })
    return (
    <Card>
      <CardHeader>
        <CardTitle>URL : /dashboard</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        {projects.map((project) => (
        <Card className="p-4 flex items-start gap-4 relative" key={project.id}>
          <div className="absolute top-2 right-2">
            <DeleteProjectButton id={project.id}/>
          </div>
          <div className="flex flex-col gap-2 flex-1">
            <p className="text-lg font-semibold text-primary">{project.project}</p>
            <p className="max-w-[360px]">{project.description}</p>
          </div> 
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