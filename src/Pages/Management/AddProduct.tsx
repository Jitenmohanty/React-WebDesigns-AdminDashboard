import { ChangeEvent, useState } from 'react';
import AdminSidebar from '../../Components/AdminSidebar'

const AddProduct = () => {

  const [name, setName] = useState<string>("");
  const [price, setPrice] = useState<number>();
  const [stock, setStock] = useState<number>();
  const [photo, setPhoto] = useState<string>();

  const fileHandler = (e:ChangeEvent<HTMLInputElement>)=>{
        const file:File|undefined = e.target.files?.[0];
        const reader:FileReader = new FileReader();

        if(file){
          reader.readAsDataURL(file);
          reader.onloadend = ()=>{
            if(typeof reader.result ==="string") setPhoto(reader.result)
          }
        }
  }
  

  return (
    <div className="adminContainer">
    <AdminSidebar/>
    <main className='product-management'>
      <article>
        <form>
            <h2>New Product</h2>
            <div>
              <label>Name</label>
              <input value={name} onChange={(e)=>setName(e.target.value)} type="text" placeholder='Name' required/>
            </div>
            <div>
              <label>Price</label>
              <input value={price} onChange={(e)=>setPrice(Number(e.target.value))} type="number" placeholder='Name' required/>
            </div>
            <div>
              <label>Stock</label>
              <input value={stock} onChange={(e)=>setStock(Number(e.target.value))} type="number" placeholder='Name' required/>
            </div>
            <div>
              <label>Photo</label>
              <input onChange={fileHandler} type="file" placeholder='Name' required/>
            </div>
            {photo && <img src={photo} alt='new image'/>}
            <button type="submit">Create</button>
        </form>
      </article>
    </main>
    </div>
  )
}

export default AddProduct
