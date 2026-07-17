import React from 'react'
import '../AdminStyles/CreateProduct.css'
import Navbar from '../components/Navbar'
import PageTitle from '../components/PageTitle'
import Footer from '../components/Footer'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { createProducts, removeErrors , removeSuccess } from '../features/admin/adminSlice'
import { useEffect } from 'react'
import { toast } from 'react-toastify'

const CreateProduct = () => {
    const {success,error,loading}=useSelector((state)=>state.admin);
    const dispatch=useDispatch();
    const [Name, setName] = React.useState('');
    const [Price, setPrice] = React.useState('');
    const [Description, setDescription] = React.useState('');
    const [Category, setCategory] = React.useState('');
    const [Stock, setStock] = React.useState('');
    const [Image, setImage] = React.useState([]);
    const categories=['Lips','Face','Eyes','Nails'];
    const[imagePreview,setImagePreview]=React.useState([]);
    const createProductSubmit=(e)=>{
        e.preventDefault();
        const myForm=new FormData();
        myForm.set('name',Name);
        myForm.set('price',Price);
        myForm.set('description',Description);
        myForm.set('category',Category);
        myForm.set('stock',Stock);
        Image.forEach((img) => {
            myForm.append('images', img);
        });
         dispatch (createProducts(myForm));
    }
      const createProductImage=(e)=>{
            const files=Array.from(e.target.files);
        
            setImage([]);
             setImagePreview([]);
             files.forEach((file)=>{
                const reader=new FileReader();
                reader.onload=()=>{
                    if(reader.readyState===2){
                    setImagePreview((old)=>[...old,reader.result]);
                    setImage((old)=>[...old,reader.result]);
                }
            }
                reader.readAsDataURL(file);
             });
        }   
        useEffect(()=>{
            if(error){
                toast.error(error,{position:'top-center',autoClose:3000});
                dispatch(removeErrors());
            }
            if(success){
                toast.success("Product Created Successfully",{position:'top-center',autoClose:3000});
                dispatch(removeSuccess());
            }
            },[])
  return (
   <>
   <Navbar/>
    <PageTitle title="Create Product"/>
<div className="create-product-container">
    <h1 className="form-title">Create Product</h1>
    <form className="product-form" encType='multipart/form-data'onSubmit={createProductSubmit}>
        <input type="text" className="form-input" placeholder='Enter Product Name'  value={Name} onChange={(e)=>setName(e.target.value)} required/>
        <input type="number" className="form-input" placeholder='Enter Product Price' value={Price} onChange={(e)=>setPrice(e.target.value)} required/>
        <input type="text" className="form-input" placeholder='Enter Product Description' value={Description} onChange={(e)=>setDescription(e.target.value)} required/>
        <select className='form-select' value={Category} onChange={(e)=>setCategory(e.target.value)} required>
            <option value="">Select Category</option>
            {categories.map((item) => (
                <option value={item} key={item}>
                    {item}
                </option>
            ))}
        </select>
       <input type="number" className="form-input" placeholder='Enter Product Stock' value={Stock} onChange={(e)=>setStock(e.target.value)} required/>  
       <div className="file-input-container">
        <input type="file" accept="image/" className="form-input-file" name='image' onChange={createProductImage} required/>
       </div>
      {imagePreview.map((img, index)=>(
        <div className="image-preview-container">
    <img src={img} alt="Product Preview" className='image-preview'
    key={index} />
</div>
      )) }
<button type="submit" className="submit-btn">Create Product</button>
    </form>
</div>
    <Footer/>
   </>
  )
}

export default CreateProduct
