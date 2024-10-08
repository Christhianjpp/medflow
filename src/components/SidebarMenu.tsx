"use client"
import React from 'react';
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
    ChevronDown,
    Home,
    Calendar,
    Clipboard,
    Users,
    Brain,
    CheckSquare,
    DollarSign,
    Settings,
    Activity,
    MapPin,
    AlertTriangle,
    NotebookIcon,
    ListCheck,
    ClipboardCheck
} from "lucide-react";
import Link from "next/link"; // Importa Link de Next.js
import { usePathname } from "next/navigation"; // Importa usePathname

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> { }

export default function SidebarMenu({ className }: SidebarProps) {
    const pathname = usePathname(); // Obtiene la ruta actual

    return (
        <div className={cn("flex flex-col h-screen w-64 bg-[#1e3a5f] text-gray-100", className)}>
            <div className="p-4 border-b border-gray-600">
                <div className="flex items-center space-x-2 mb-4">
                    <Activity className="h-6 w-6 text-blue-300" />
                    <span className="text-xl font-bold text-blue-300">MedFlow</span>
                </div>
                <div className="p-2 bg-[#2c4a6f] rounded-lg">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="w-full justify-start p-0 hover:bg-[#3a587d] text-gray-100">
                                <Avatar className="w-8 h-8 mr-2">
                                    <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Dr. John Doe" />
                                    <AvatarFallback>JD</AvatarFallback>
                                </Avatar>
                                <div className="flex flex-col items-start">
                                    <span className="font-medium text-sm">Dr. John Doe</span>
                                    <span className="text-xs text-gray-300 flex items-center">
                                        <MapPin className="h-3 w-3 mr-1" />
                                        Clínica Central, Ciudad
                                    </span>
                                </div>
                                <ChevronDown className="h-4 w-4 ml-auto opacity-50" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-56 bg-[#2c4a6f] text-gray-100">
                            <DropdownMenuLabel>Mi Cuenta</DropdownMenuLabel>
                            <DropdownMenuSeparator className="bg-gray-600" />
                            <DropdownMenuItem className="hover:bg-[#3a587d]">Perfil</DropdownMenuItem>
                            <DropdownMenuItem className="hover:bg-[#3a587d]">Configuración</DropdownMenuItem>
                            <DropdownMenuItem className="hover:bg-[#3a587d]">Cerrar Sesión</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
            <ScrollArea className="flex-1">
                <div className="p-4 space-y-2">
                    <Link href="/" passHref>
                        <Button
                            variant="ghost"
                            className={cn(
                                "w-full justify-start hover:bg-[#2c4a6f] text-gray-100",
                                pathname === "/" && "bg-[#2c4a6f] text-white"
                            )}
                        >
                            <Home className="mr-2 h-4 w-4" />
                            Inicio
                        </Button>
                    </Link>
                    <Link href="/citas" passHref>
                        <Button
                            variant="ghost"
                            className={cn(
                                "w-full justify-start hover:bg-[#2c4a6f] text-gray-100",
                                pathname === "/citas" && "bg-[#2c4a6f] text-white"
                            )}
                        >
                            <NotebookIcon className="mr-2 h-4 w-4" />
                            Citas
                        </Button>
                    </Link>
                    <Link href="/consultas" passHref>
                        <Button
                            variant="ghost"
                            className={cn(
                                "w-full justify-start hover:bg-[#2c4a6f] text-gray-100",
                                pathname === "/consultas" && "bg-[#2c4a6f] text-white"
                            )}
                        >
                            <ClipboardCheck className="mr-2 h-4 w-4" />
                            Consultas
                        </Button>
                    </Link>
                    <Link href="/tratamientos" passHref>
                        <Button
                            variant="ghost"
                            className={cn(
                                "w-full justify-start hover:bg-[#2c4a6f] text-gray-100",
                                pathname === "/tratamientos" && "bg-[#2c4a6f] text-white"
                            )}
                        >
                            <Clipboard className="mr-2 h-4 w-4" />
                            Tratamientos
                        </Button>
                    </Link>
                    <Link href="/pacientes" passHref>
                        <Button
                            variant="ghost"
                            className={cn(
                                "w-full justify-start hover:bg-[#2c4a6f] text-gray-100",
                                pathname === "/pacientes" && "bg-[#2c4a6f] text-white"
                            )}
                        >
                            <Users className="mr-2 h-4 w-4" />
                            Pacientes
                        </Button>
                    </Link>
                    <Link href="/diagnostico-ai" passHref>
                        <Button
                            variant="ghost"
                            className={cn(
                                "w-full justify-start hover:bg-[#2c4a6f] text-gray-100",
                                pathname === "/diagnostico-ai" && "bg-[#2c4a6f] text-white"
                            )}
                        >
                            <Brain className="mr-2 h-4 w-4" />
                            Diagnóstico AI
                        </Button>
                    </Link>
                    <Link href="/tareas" passHref>
                        <Button
                            variant="ghost"
                            className={cn(
                                "w-full justify-start hover:bg-[#2c4a6f] text-gray-100",
                                pathname === "/tareas" && "bg-[#2c4a6f] text-white"
                            )}
                        >
                            <CheckSquare className="mr-2 h-4 w-4" />
                            Tareas
                        </Button>
                    </Link>
                    <Link href="/reclamos" passHref>
                        <Button
                            variant="ghost"
                            className={cn(
                                "w-full justify-start hover:bg-[#2c4a6f] text-gray-100",
                                pathname === "/reclamos" && "bg-[#2c4a6f] text-white"
                            )}
                        >
                            <AlertTriangle className="mr-2 h-4 w-4" />
                            Reclamos
                        </Button>
                    </Link>
                    <Link href="/finanzas" passHref>
                        <Button
                            variant="ghost"
                            className={cn(
                                "w-full justify-start hover:bg-[#2c4a6f] text-gray-100",
                                pathname === "/finanzas" && "bg-[#2c4a6f] text-white"
                            )}
                        >
                            <DollarSign className="mr-2 h-4 w-4" />
                            Finanzas
                        </Button>
                    </Link>
                </div>
            </ScrollArea>
            <div className="p-4 border-t border-gray-600">
                <Link href="/configuracion" passHref>
                    <Button
                        variant="ghost"
                        className={cn(
                            "w-full justify-start hover:bg-[#2c4a6f] text-gray-100",
                            pathname === "/configuracion" && "bg-[#2c4a6f] text-white"
                        )}
                    >
                        <Settings className="mr-2 h-4 w-4" />
                        Configuración
                    </Button>
                </Link>
            </div>
        </div>
    );
}
