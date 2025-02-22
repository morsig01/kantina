import { Card, CardContent } from "@/components/ui/card";

export default function Content() {
    return (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 p-4">
            <Card className="rounded-[8vw]">
                <CardContent className="p-16 text-center">Boks 1</CardContent>
            </Card>
            <Card className="rounded-[8vw]">
                <CardContent className="p-16 text-center">Boks 2</CardContent>
            </Card>
            <Card className="rounded-[8vw]">
                <CardContent className="p-16 text-center">Boks 3</CardContent>
            </Card>
            <Card className="rounded-[8vw]">
                <CardContent className="p-16 text-center">Boks 4</CardContent>
            </Card>
        </div>
    );
}