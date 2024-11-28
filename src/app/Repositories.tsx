import React, {useEffect, useState} from "react";
import {media} from "@/hooks/useMedia.tsx";
import {MenuItem} from "primereact/menuitem";
import {PanelMenu} from "primereact/panelmenu";
import {Carousel, CarouselResponsiveOption} from "primereact/carousel";


interface Product {
  id: string;
  code: string;
  name: string;
  description: string;
  image: string;
  category: string;
  inventoryStatus: string;
  rating: number;
}

const Repositories: React.FC = () => {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  const handleResize = () => {
    setWidth(window.innerWidth);
  };
  const width1=width>768?media.width/5 :'100%'
  const width2=width>768?media.width-media.width/5 :'100%'
  const width3=(width<1400 && width>768)?width-media.width/5 : '100%'

  const [products, setProducts] = useState<Product[]>([]);
  const responsiveOptions: CarouselResponsiveOption[] = [
    {
      breakpoint: '1400px',
      numVisible: 2,
      numScroll: 1
    },
    {
      breakpoint: '1199px',
      numVisible: 3,
      numScroll: 1
    },
    {
      breakpoint: '767px',
      numVisible: 2,
      numScroll: 1
    },
    {
      breakpoint: '575px',
      numVisible: 1,
      numScroll: 1
    }
  ];



  const productTemplate = (product: Product) => {
    return (
        <div className="border-1 surface-border border-round m-2 text-center py-5 px-3">
          <div className="mb-3">
            <img src={`https://primefaces.org/cdn/primereact/images/product/${product.image}`} alt={product.name} className="w-6 shadow-2" />
          </div>
        </div>
    );
  };

  const items: MenuItem[] = [
    {
      label: '我的空间',
      icon: 'pi pi-palette',
      items: [
        {
          label: '探索',
          icon: 'pi pi-eraser',
          url: '#'
        },
        {
          label: '概览',
          icon: 'pi pi-heart',
          url: '#'
        },
        {
          label: '收藏',
          icon: 'pi pi-link',
          url:'#'
        },
        {
          label: '最近使用',
          icon: 'pi pi-link',
          url:'#'
        },
        {
          label: '仓库',
          icon: 'pi pi-home',
          items: [
            {
              label: '学习资料',
              icon: 'pi pi-star',
              url: '#'
            },
            {
              label: '博客文档',
              icon: 'pi pi-bookmark',
              url: '#'
            },
            {
              label: '关于存储开发的',
              icon: 'pi pi-bookmark',
              url: '#'
            },
            {
              label: '创建仓库',
              url: '#'
            },
          ]
        },
        {
          label: '标签',
          icon: 'pi pi-home',
          items: [
            {
              label: '竞赛',
              icon: 'pi pi-star',
              url: '#'
            },
            {
              label: '房产数据',
              icon: 'pi pi-bookmark',
              url: '#'
            },
            {
              label: '交易数据',
              icon: 'pi pi-bookmark',
              url: '#'
            },
            {
              label: '创建仓库',
              url: '#'
            },
          ]
        },
        {
          label: '存储空间',
          icon: 'pi pi-home',
          items: [
            {
              label: '官方存储',
              icon: 'pi pi-star',
              url: '#'
            },
            {
              label: '阿里云存储',
              icon: 'pi pi-bookmark',
              url: '#'
            },
            {
              label: 'IPFS',
              icon: 'pi pi-bookmark',
              url: '#'
            },
            {
              label: '新增存储空间',
              url: '#'
            },
          ]
        }
      ]
    },
  ];
  return (
    <div className="w-full flex h-full p-3 pt-0 flex-col md:flex-row">
      <div className="w-full min-w-64 border-r h-fit md:h-full md:w-1/4" style={{width:width1}}>
        <PanelMenu model={items} className="w-full md:w-20rem" />
      </div>

     <div className="justify-center items-center w-full flex h-full" style={{width:width3}}>
       <div className="flex flex-col w-full h-full " style={{width:width2}}>
         <div className="h-16 text-lg text-center  border rounded-sm md:ml-3">
           action
         </div>
         <div className="w-full h-1/4 flex my-2 flex-col sm:space-x-4 md:pl-3  sm:flex-row ">
           <div className="flex-1 bg-white border rounded-sm p-4">
             <h2 className="text-lg font-bold">Card 1</h2>
           </div>
           <div className="flex-1 bg-white border rounded-sm p-4">
             <h2 className="text-lg font-bold">Card 2</h2>
           </div>
           <div className="w-1/4 md:bg-white md:border md:rounded-sm md:p-4 ">
             <h2 className="text-lg font-bold">Card 3</h2>
             <Carousel value={products} numVisible={1} numScroll={1} responsiveOptions={responsiveOptions} className="custom-carousel w-full h-full" circular autoplayInterval={3000} itemTemplate={productTemplate} />
           </div>
         </div>

         <div className="w-full h-full flex md:pl-3">
           <div className="flex-grow bg-gray-100 p-3">
             <h2 className="text-lg font-bold">Left Box</h2>
           </div>
           <div className="w-1/4 min-w-40 bg-white p-4 border-l hidden md:hidden lg:hidden 2xl:block">
             <h2 className="text-lg font-bold">Right Box</h2>
           </div>
         </div>
       </div>
     </div>
    </div>
  );
};

export default Repositories;
