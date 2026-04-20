import CardProd from "../componentes/ProductosPage/CardProd";
import productos from "../data/productos";

export default function Productos() {
  return (
    <section className="py-12 px-4 md:px-8 bg-black" id="productos">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {productos.map((producto) => (
            <CardProd key={producto.id} producto={producto} />
          ))}
        </div>
      </div>
    </section>
  );
}
