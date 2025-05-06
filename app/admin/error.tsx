"use client";

import { CircleAlert } from 'lucide-react';
import { Card, CardHeader, CardTitle } from "@/src/components/ui/card"

export default function Loading() {
    return (
    <Card>
        <CardHeader>
            <CardTitle className='flex items-center gap-2'><CircleAlert/>Error</CardTitle>
        </CardHeader>
    </Card>
    )
}