import Button from "@/components/Button";
import Navbar from "@/components/Navbar"
import api from "@/services/api";
import { useEffect } from "react";

function Home() {

  useEffect(() => {
  async function getUser() {
    const response = await api.get("/api/profile/")
  }

  getUser()
}, [])
  return (
    <>
    <Navbar />
    <div className="min-h-screen bg-zinc-100">
      <div className="w-full max-w-6xl mx-auto px-4 py-6">
        <div className="bg-white rounded-xl shadow p-6">
          <h1 className="text-2xl">Bem vindo ao Mercado Fechado</h1>
          <h2 className="my-2">Consulte os nossos produtos apertando o botão abaixo:</h2>
          <Button Link='/listar_produtos' />
        </div>
      </div>
    </div>
    </>
  )
}

export default Home
