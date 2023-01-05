import { useEffect, useState } from "react";
import { DragonService } from "../../../services/dragon/dragon.service";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { IDragon } from "../../../types/dragon.types";
import "./sicred-card.css";

const dragonService = new DragonService();

export function SicrediCard() {
  const [dragons, setDragons] = useState<IDragon[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchDragons = async () => {
    try {
      setLoading(true);

      const response = await dragonService.getDragon();

      setDragons(response.data);

      setLoading(false);
    } catch {
      toast.error("Erro ao retornar dragões");
    }
  };

  const deleteDragon = async (id: string) => {
    try {
      setLoading(true);

      await dragonService.deleteDragon(id);

      toast.success("Dragão deletado com sucesso!");
      fetchDragons();
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error("Erro ao deletar dragão!");
    }
  };

  useEffect(() => {
    fetchDragons();
  }, []);

  if (loading) {
    return (
      <div className="loading">
        <h2>Carregando...</h2>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="list-dragons">
        {dragons.map((dragon) => {
          return (
            <div className="content">
              <article key={dragon.id}>
                <strong>Nome: {dragon.name}</strong>
                <strong>Tipo: {dragon.type}</strong>
                <Link className="button-details" to={`/home/${dragon.id}`}>
                  Detalhes
                </Link>
                <Link className="button-edit" to={`edit/${dragon.id}`}>
                  Editar
                </Link>
                <button
                  className="button-delete"
                  onClick={() => deleteDragon(dragon.id)}
                >
                  Excluir
                </button>
              </article>
            </div>
          );
        })}
      </div>
    </div>
  );
}
