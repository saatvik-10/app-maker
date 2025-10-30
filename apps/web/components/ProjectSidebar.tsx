'use client'

import {
    Drawer,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
} from '@/components/ui/drawer';
import { Button } from './ui/button';
import { Input } from './ui/input';

export function ProjectSidebar() {
    return (
        <Drawer>
            <DrawerContent>
                <DrawerHeader></DrawerHeader>
                <DrawerFooter></DrawerFooter>
            </DrawerContent>
        </Drawer>
    )
}