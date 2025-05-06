import { Button } from "@/src/components/ui/button";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/src/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card";

export default function Page() {
    return (
    <Card>
        <CardHeader>
            <CardTitle>New Project</CardTitle>
        </CardHeader>
        <CardContent>
            <form 
                action="/api/projects"
                method="POST"
            >
                <Label>
                    Project
                    <Input name="project name" />
                </Label>
                <Label>
                    Description
                    <Input name="project description" className="mb-5" />
                </Label>
                <Button type="submit">Create</Button>
            </form>
        </CardContent>
    </Card>
    )
}