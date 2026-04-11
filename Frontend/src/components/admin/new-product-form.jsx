import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input"
import { Link } from "react-router-dom";


export function NewProductForm({ onSubmit,
  ...props
}) {
  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>Cadastre um novo produto</CardTitle>
        <CardDescription>
          Preencha as informações do novo produto
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={ (e) => {
            e.preventDefault()

            const formData = new FormData(e.target)

            const data = {
              name: formData.get("name"),
              description: formData.get("description"),
              price: formData.get("price"),
              stock: formData.get("stock")
            }

            onSubmit?.(data)
          }}
        >
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="name">Nome do Produto</FieldLabel>
              <Input id="name" name="name" type="text" placeholder="Nome do produto" required />
            </Field>
            <Field>
              <FieldLabel htmlFor="price">Preço do Produto</FieldLabel>
              <Input 
                  id="price" 
                  name="price" 
                  type="number" 
                  step="0.01"
                  min="0"
                  max="9999999.99"
                  placeholder="Preço do produto" 
                  required 
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="description">Descrição do Produto</FieldLabel>
              <Input id="description" name="description" type="text" placeholder="Descrição do produto" required />
            </Field>
            <Field>
              <FieldLabel htmlFor="stock">
                Estoque Inicial do Produto
              </FieldLabel>
              <Input id="stock" name="stock" type="number" placeholder="Estoque inicial" required />
              <FieldDescription>Por favor informe o estoque inicial do produto</FieldDescription>
            </Field>
            <FieldGroup>
              <Field>
                <Button type="submit" className="cursor-pointer"><Link to="/admin/produtos">Cadastrar novo produto</Link></Button>
              </Field>
            </FieldGroup>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
