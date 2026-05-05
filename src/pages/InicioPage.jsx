import InicioSection from "../componentes/InicioPage/InicioSection";
import ProductosSection from "../componentes/InicioPage/ProductosSection";
import SobreSection from "../componentes/InicioPage/SobreSection";
import ContactoSection from "../componentes/InicioPage/ContactoSection";

export default function InicioPage() {
  return (
    <div>
      <InicioSection />
      <ProductosSection />
      <SobreSection />
      <ContactoSection />
    </div>
  );
}
