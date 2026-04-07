import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Link } from "react-router-dom"


export function LoginForm({
  className,
  onSubmit,
  ...props
}) 
{
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Faça Login na sua conta</CardTitle>
          <CardDescription>
            Coloque seu Email abaixo para o seu Login
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
           onSubmit={ (e) => {
            e.preventDefault()

            const formData = new FormData(e.target)

            const data = {
              username: formData.get("username"),
              password: formData.get("password"),
            }

            onSubmit?.(data)
          }}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="username">Nome</FieldLabel>
                <Input id="username" type="text" name='username' placeholder="Seu nome" required />
              </Field>
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                </div>
                <Input id="password" type="password" name='password' required />
                <FieldDescription>
                  Deve conter somente letras e números
                </FieldDescription>
              </Field>
              <Field>
                <Button type="submit" className="cursor-pointer" ><Link to="/">Login</Link></Button>
                <FieldDescription className="text-center">
                  Não tem uma conta? <a href="/signup">Cadastrar-se</a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
