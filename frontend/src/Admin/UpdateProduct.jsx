import React from 'react'
import '../AdminStyles/UpdateProduct.css'
import Navbar from '../components/Navbar'
import PageTitle from '../components/PageTitle'
import Footer from '../components/Footer'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { getProductDetails } from '../features/productSlice'
import { removeErrors,removeSuccess , updateProduct} from '../features/admin/adminSlice'
import { toast } from 'react-toastify'



const UpdateProduct = () => {
      const [Name, setName] = React.useState('');
       const [Price, setPrice] = React.useState('');
       const [Description, setDescription] = React.useState('');
       const [Category, setCategory] = React.useState('');
       const [Stock, setStock] = React.useState('');
       const[image,setImage]=React.useState([]);
       const [oldImage, setOldImage] = React.useState([]);
       const[imagePreview,setImagePreview]=React.useState([]);
         const {product}=useSelector(state=>state.product);
         const {success,loading,error}=useSelector(state=>state.admin);
        const dispatch=useDispatch();
        const navigate=useNavigate();
          const {UpdateId}=useParams();
          const categories=['Lips','Face','Eyes','Nails'];
      useEffect(()=>{
  dispatch(getProductDetails(UpdateId))
},[dispatch,UpdateId])
useEffect(() => {
  if(product){
    setName(product.name)
    setPrice(product.price)
    setDescription(product.description)
    setCategory(product.category)
    setStock(product.stock)
    
    setOldImage(product.image);
  }
}, [product])
          const handleImageChange = (e) => {
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
          };
          const updateProductSubmit=(e)=>{
            e.preventDefault();
            const myForm=new FormData();
            myForm.set('name',Name);
        myForm.set('price',Price);
        myForm.set('description',Description);
        myForm.set('category',Category);
        myForm.set('stock',Stock);
        image.forEach((img) => {
            myForm.append('images', img);
        });  
           dispatch(updateProduct({id:UpdateId, formData:myForm}));
          }
       useEffect(() => {
  if (success) {
    toast.success("Product Updated Successfully", {
      position: 'top-center',
      autoClose: 3000
    });
    dispatch(removeSuccess());
    navigate('/admin/products');
  }
  if (error) {
  toast.error(error, { position: 'top-center', autoClose: 3000 });
  dispatch(removeErrors());
}
}, [dispatch, error,success]);
       
  return (
   <>
   <Navbar/>
   <PageTitle title="Update Product"/>
   <div className="update-product-wrapper">
    <h1 className='update-product-title'> Update Product</h1>
    <form className="update-product-form" encType="multipart/form-data" onSubmit={updateProductSubmit}>
    <label htmlFor="name" >Product Name</label>
       <input type="text" className='update-product-input' id="name" name="name" value={Name} onChange={(e) => setName(e.target.value)} required/>
       <label htmlFor="price" >Product Price</label>
       <input type="text" className='update-product-input' id="price" name="price" value={Price} onChange={(e) => setPrice(e.target.value)} required/>
    <label htmlFor="description" >Product Description</label>
       <textarea className='update-product-textarea' id="description" name="description" value={Description} onChange={(e) => setDescription(e.target.value)} required></textarea>
       <label htmlFor="category" >Product Category</label>
       <select className='update-product-select' id="category" name="category" value={Category} onChange={(e) => setCategory(e.target.value)} required>
         <option value=''>Select Category</option>
               {categories.map((item) => (
                <option value={item} key={item}>
                    {item}
                </option>
            ))}
         
        
       </select>
          <label htmlFor="stock" >Product Stock</label>
       <input type="number" className='update-product-input' id="stock" name="stock" value={Stock} onChange={(e) => setStock(e.target.value)} required/>
       <label htmlFor="image">Product Images</label>
<div className="update-product-file-wrapper">
  <input type="file" accept="image/" name="image" multiple className="update-product-file-input" onChange={handleImageChange}/>
</div>
<div className="update-product-preview-wrapper">
   {imagePreview.map((img,index)=>(
  <img src={img} alt="Product Preview" key={index} className="update-product-preview-image" />
))}
 
</div>

   <div className="update-product-old-images-wrapper">
      {oldImage?.map((img,index)=>(
  <img src={img.url ? img.url : img} alt="Old Product Preview" key={index} className="update-product-old-image" />
))}
  
</div>
<button type="submit" className='update-product-submit-btn' >{loading? 'Updating...': 'Update'}</button>
    </form>
   </div>
   <Footer/>
   </>
  )
}

export default UpdateProduct


