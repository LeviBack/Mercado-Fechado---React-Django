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
import { FolderMinus } from "lucide-react";

export function SignupForm({ onSubmit,
  ...props
}) {
  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>Crie sua conta</CardTitle>
        <CardDescription>
          Preencha suas informações para a criação da sua conta
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={ (e) => {
            e.preventDefault()

            const formData = new FormData(e.target)

            const data = {
              name: formData.get("name"),
              email: formData.get("email"),
              password: formData.get("password"),
              confirmPassword: formData.get("confirm-password")
            }

            if (data.password !== data.confirmPassword) {
              alert("As senhas não coincidem")
              return
            }

            onSubmit?.(data)
          }}
        >
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="name">Nome</FieldLabel>
              <Input id="name" name="name" type="text" placeholder="Seu nome" required />
            </Field>
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input id="email" type="email" name="email" placeholder="@gmail.com" required />
            </Field>
            <Field>
              <FieldLabel htmlFor="password">Senha</FieldLabel>
              <Input id="password" name="password" type="password" required />
              <FieldDescription>
                Deve conter apenas letras e números e no minímo 9 dígitos
              </FieldDescription>
            </Field>
            <Field>
              <FieldLabel htmlFor="confirm-password">
                Confirme sua Senha
              </FieldLabel>
              <Input id="confirm-password" name="confirm-password" type="password" required />
              <FieldDescription>Por favor confirme sua senha</FieldDescription>
            </Field>
            <FieldGroup>
              <Field>
                <Button type="submit" className="cursor-pointer">Criar sua conta</Button>
                <FieldDescription className="px-6 text-center">
                  Já tem sua conta? <a href="/signin">Fazer Login</a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
