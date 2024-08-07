import "./ProductForm.css"
import {Button, Form, Input, InputNumber, notification, Select} from "antd";
import {AiOutlineCloudUpload} from "react-icons/ai";
import {useFetch} from "../../hooks/useFetch.jsx";
import {useState} from "react";
import {useSelector} from "react-redux";

const {TextArea} = Input

const ProductForm = ({updateProduct, setUpdateProduct, setOpen}) => {
  const authData = useSelector(state => state)
  const [categoryData] = useFetch("/product/category")
  const [productTypeData] = useFetch("/product/product-type")
  const [productImages, setProductsImages] = useState(null)
  // Form
  const onFinish = (values) => {
    const form = new FormData();
    form.append("product_name", values.product_name)
    form.append("category", values.category[0])
    form.append("product_type", values.product_type[0])
    form.append("description", values.description)
    form.append("original_price", values.original_price)
    form.append("sale_price", values.sale_price)
    form.append("number_in_stock", values.number_in_stock)

    for (let i = 0; i < productImages.length; i++) {
      form.append("product_images", productImages[i])
    }
    console.log(updateProduct)
    fetch( updateProduct ? `http://localhost:8000/product/update/${updateProduct._id}` :"http://localhost:8000/product/create", {
      method: updateProduct ? "PUT" : "POST",
      headers: {
        "Authorization": "Bearer " + authData.token
      },
      body: form
    })
      .then(res => res.json())
      .then(data => {
        console.log(data)
        setUpdateProduct(null)
        setOpen(false)
        notification.success({
          message: "Success"
        })
      })
      .catch(err => console.log(err))


  }
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Form
      name="basic"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 24,
      }}
      style={{
        maxWidth: 600,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      layout="vertical"
    >
      <Form.Item
        label="Product name"
        name="product_name"
        rules={[
          {
            required: true,
            message: 'Please input your product name!',
          },
        ]}
      >
        <Input/>
      </Form.Item>

      <div className="grid grid-cols-2 gap-2 product-form">
        <Form.Item
          label="Category"
          name="category"
          rules={[
            {
              required: true,
              message: 'Please select category!',
            },
          ]}
        >
          <Select
            className="w-full"
            mode="tags"
            maxCount={1}
            options={categoryData.payload?.map(category => ({key: category, label: category, value: category}))}
          />
        </Form.Item>
        <Form.Item
          label="Product type"
          name="product_type"
          rules={[
            {
              required: true,
              message: 'Please select product type!',
            },
          ]}
        >
          <Select
            mode="tags"
            maxCount={1}
            className="w-full"
            options={productTypeData.payload?.map(type => ({key: type, label: type, value: type}))}
          />
        </Form.Item>
      </div>

      <div className="grid grid-cols-3 gap-2 product-form">
        <Form.Item
          label="Original price"
          name="original_price"
          rules={[
            {
              required: true,
              message: 'Please enter your original price!',
            },
          ]}
        >
          <InputNumber className="w-full" min={1}/>
        </Form.Item>
        <Form.Item
          label="Sale price"
          name="sale_price"
          rules={[
            {
              required: true,
              message: 'Please enter your sale price!',
            },
          ]}
        >
          <InputNumber className="w-full" min={1}/>
        </Form.Item>
        <Form.Item
          label="Number in stock"
          name="number_in_stock"
          rules={[
            {
              required: true,
              message: 'Please input your number in stock!',
            },
          ]}
        >
          <InputNumber className="w-full" min={1}/>
        </Form.Item>
      </div>

      <Form.Item
        label="Description"
        name="description"
        rules={[
          {
            required: true,
            message: 'Please enter description!',
          },
        ]}
      >
        <TextArea rows={4} style={{resize: "none"}}/>
      </Form.Item>

      <Form.Item
        label="Product Images"
        name="product_images"
        rules={[
          {
            required: true,
            message: 'Please enter product images!',
          },
        ]}
      >
        <div className="file_content">
          <div
            className="file_box flex flex-col items-center justify-center w-full gap-2 border border-dashed border-gray-400 rounded-lg py-4 ">
            <p className="flex items-center justify-center w-full text-3xl text-sky-500">
              <AiOutlineCloudUpload/>
            </p>
            <p className=" text-xl ">Click or drag file to this area to upload</p>
            <p className=" text-[12px] leading-normal text-gray-400 text-center">
              PNG, JPG, JPEG, GIF , WEBP, MP4
            </p>
          </div>
          <input type="file" multiple accept="image/jpeg,image/webp,image/png,image/jpg,video/mp4" name="file"
                 className="input_file" onChange={(e) => setProductsImages(e.target.files)}/>
        </div>

      </Form.Item>

      <Form.Item
        wrapperCol={{
          span: 24,
        }}
      >
        <Button className="w-full" type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>

    </Form>
  )
}
export default ProductForm
