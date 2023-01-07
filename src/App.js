import './App.css';
import { useState, useEffect} from "react";

const url = "http://localhost:3000/products";

function App() {

    const [products, setProducts] = useState([]); // salvando os dados 
    const [name, setName] = useState("");
    const [price, setPrice] = useState("")

    const [loading, setLoading] = useState(false);

    useEffect(() => {
      async function fetchData() {

        setLoading(true)

        const res = await fetch(url);

        const data = await res.json();

        setProducts(data);

        setLoading(false)

      }

      fetchData();
    }, []);

 
    const enviarFormulario = async (e) => {
      e.preventDefault();

      const product = {
        name,
        price,
      };

      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      });

      const addedProduct = await res.json()

      setProducts((produtoAntigo) => [...produtoAntigo, addedProduct])

      setName("");
      setPrice("");

    };










  return (
    <div className="App">
      <h1>Lista de produtos</h1>
      {loading && <p>Carregando os dados...</p>}
      <ul>
        {products.map((products)=> (
          <li key={products.id}>{products.name} - R$: {products.price}</li>

        ))}
      </ul>
      <div className='produtos'>
        <form onSubmit={enviarFormulario}>
          <label>
            Nome:
            <input type="text" value={name} name="name" onChange={(e) => setName(e.target.value)} />
          </label>

          <label>
            Preço:
            <input type="number" value={price} name="price" onChange={(e) => setPrice(e.target.value)} />
          </label>

          {loading && <input type="submit" disabled value="Aguarde" />}
          {!loading && <input type="submit" value="Criar produto" />}
        </form>

      </div>
    </div>
  );
}

export default App;
