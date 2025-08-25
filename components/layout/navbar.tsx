"use client"

import Link from "next/link"
import { Sparkles, Menu, X } from "lucide-react"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu"
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import React from "react"

const ageGroups = [
  { id: "0-2", title: "0-2 anos", description: "O Mundo das Descobertas" },
  { id: "3-5", title: "3-5 anos", description: "Exploradores Lógicos" },
  { id: "6-8", title: "6-8 anos", description: "Mestres dos Desafios" },
  { id: "9-12", title: "9-12 anos", description: "Gênios em Treinamento" },
]

const thematicCategories = [
  { id: "english", title: "Inglês", description: "Aprenda um novo idioma" },
  { id: "science", title: "Ciências", description: "Descubra o mundo" },
  { id: "music", title: "Música", description: "Explore sons e ritmos" },
]

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        {/* Logo */}
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <Sparkles className="h-6 w-6 text-purple-600" />
          <span className="font-bold sm:inline-block">
            Seraphineplay
          </span>
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex flex-1">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Faixas Etárias</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                    {ageGroups.map((group) => (
                      <ListItem key={group.id} href={`/age/${group.id}`} title={group.title}>
                        {group.description}
                      </ListItem>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Categorias</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                     {thematicCategories.map((cat) => (
                      <ListItem key={cat.id} href={`/category/${cat.id}`} title={cat.title}>
                        {cat.description}
                      </ListItem>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
               <NavigationMenuItem>
                 <Link href="/parents" legacyBehavior passHref>
                   <NavigationMenuLink className="font-medium text-sm px-4 py-2 hover:bg-accent hover:text-accent-foreground rounded-md">
                     Para os Pais
                   </NavigationMenuLink>
                 </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        
        {/* Mobile Navigation */}
        <div className="flex flex-1 items-center justify-end md:hidden">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                <SheetTrigger asChild>
                    <Button variant="ghost" size="icon">
                        <Menu className="h-6 w-6" />
                        <span className="sr-only">Abrir menu</span>
                    </Button>
                </SheetTrigger>
                <SheetContent side="left">
                    <div className="flex flex-col h-full">
                        <div className="flex items-center justify-between p-4 border-b">
                             <Link href="/" className="flex items-center space-x-2" onClick={() => setIsMobileMenuOpen(false)}>
                                <Sparkles className="h-6 w-6 text-purple-600" />
                                <span className="font-bold">Seraphineplay</span>
                            </Link>
                            <SheetClose asChild>
                                <Button variant="ghost" size="icon">
                                    <X className="h-6 w-6" />
                                </Button>
                            </SheetClose>
                        </div>
                        <div className="flex flex-col p-4 space-y-4">
                            <h3 className="font-semibold">Faixas Etárias</h3>
                            {ageGroups.map((group) => (
                                <Link key={group.id} href={`/age/${group.id}`} className="text-muted-foreground hover:text-foreground" onClick={() => setIsMobileMenuOpen(false)}>
                                    {group.title}
                                </Link>
                            ))}
                            <h3 className="font-semibold mt-4">Categorias</h3>
                            {thematicCategories.map((cat) => (
                                <Link key={cat.id} href={`/category/${cat.id}`} className="text-muted-foreground hover:text-foreground" onClick={() => setIsMobileMenuOpen(false)}>
                                    {cat.title}
                                </Link>
                            ))}
                            <Link href="/parents" className="font-semibold mt-4 hover:text-foreground" onClick={() => setIsMobileMenuOpen(false)}>
                                Para os Pais
                            </Link>
                        </div>
                    </div>
                </SheetContent>
            </Sheet>
        </div>
      </div>
    </header>
  )
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"