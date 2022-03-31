import React, { useEffect, useState, useRef } from "react";
import {getProductsByCount, fetchProductByFilter } from '../functions/product';
import { getCategories } from '../functions/category';
import { getSubs } from '../functions/sub';
import { useSelector, useDispatch } from "react-redux";
import ProductCard from '../components/cards/ProductCard';
import {Menu, Slider, Checkbox, Radio } from 'antd';
import { DollarOutlined, DownSquareOutlined, StarOutlined, TagsOutlined, AntDesignOutlined, BgColorsOutlined } from "@ant-design/icons";
import Star from '../components/forms/Star';

const { SubMenu } = Menu;

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [price, setPrice] = useState([0,0]);
    const [ok, setOk] = useState(false);
    const [categories, setCategories] = useState([]);
    const [categoryIds, setCategoryIds] = useState([]);
    const [star, setStar] = useState('');
    const [subs, setSubs] = useState([]);
    const [sub, setSub] = useState('');
    const [colors, setColors] = useState(['Black','Brown','Silver','White','Blue']);
    const [color, setColor] = useState('');
    const [brands, setBrands] = useState(['Apple','Samsung','Microsoft','Lenovo','Asus','Dell','HP','Realme','Redmi']);
    const [brand, setBrand] = useState('');
    const [shipping, setShipping] = useState('');

    let initial = useRef(true);

    let dispatch = useDispatch();
    let {search} = useSelector((state) => ({...state}));
    const {text} = search;

    useEffect(()=> {
        loadAllProducts();
        //fetch categories
        getCategories().then((res) => setCategories(res.data));
        //fetch subs
        getSubs().then((res) => setSubs(res.data));
    }, [])

    const fetchProducts = (arg) => {
        fetchProductByFilter(arg)
            .then((res) => {
                setProducts(res.data);
            })
    }
    
    //1st: load products bt default on page shop
    const loadAllProducts = () => {
        
        getProductsByCount(12).then((p) => {
            setProducts(p.data);
            setLoading(false);
        })
    }

    //2nd: load products on user search input
    useEffect(() => {       
        const delayed = setTimeout(() => {
            fetchProducts({query: text});
        },300)
        return () => clearTimeout(delayed);
    },[text])

    

    //3rd: load products based on price range
    useEffect(() => {
        if(initial.current) {
            initial.current=false;
            return;
        }
        console.log('first');
        fetchProducts({price})
    }, [ok]);

    const handleSlider = (value) => {
        dispatch({
            type: 'SEARCH_QUERY',
            payload: {text: ''}
        })

        //reset
        setCategoryIds([]);
        setPrice(value);
        setStar('');
        setSub('');
        setBrand('');
        setColor('');
        setShipping('');
        setTimeout(()=> {
            setOk(!ok);
        }, 300);
    }
    //4th: load products based on categories
    //show categories in a list of checkbox
    const showCategories = () => categories.map((c) => (
        <Checkbox 
            onChange={handleCheck} 
            key={c._id} 
            className="pb-2 mx-4 px-2" 
            value={c._id} 
            name='category'
            checked={categoryIds.includes(c._id)}
        >
            {c.name}
        </Checkbox>
    ));

    //handleCheck for categories
    const handleCheck = e => {
        //reset
        dispatch({
            type: 'SEARCH_QUERY',
            payload: { text: '',}
        }); 
        setPrice([0,0]);
        setStar('');
        setSub('');
        setBrand('');
        setColor('');
        setShipping('');
        // console.log(e.target.value)
        let intheState = [...categoryIds];
        let justchecked = e.target.value;
        let foundInTheState = intheState.indexOf(justchecked); //index or -1

        if(foundInTheState === -1) {
            intheState.push(justchecked);
        } else {
            //if found, pull out one item from index
            intheState.splice(foundInTheState, 1);
        }
        setCategoryIds(intheState);

        fetchProducts({category: intheState});
    }

    //5th: show products by star rating
    const handleStarClick = (num) => {
        // console.log(num);
        dispatch({
            type: 'SEARCH_QUERY',
            payload: { text: '',}
        }); 
        setPrice([0,0]);
        setCategoryIds([]);
        setStar(num);
        setSub('');
        setBrand('');
        setColor('');
        setShipping('');
        fetchProducts({stars: num});
    }
    const showStars = () => {
        return <div className="pb-2">
            <Star                 
                starClick={handleStarClick}
                numberOfStars ={5}
            />
            <Star                
                starClick={handleStarClick}
                numberOfStars ={4}
            />
            <Star                
                starClick={handleStarClick}
                numberOfStars ={3}
            />
            <Star 
                starClick={handleStarClick}
                numberOfStars ={2}
            />
            <Star 
                starClick={handleStarClick}
                numberOfStars ={1}
            />             
        </div>
                
    }

    //6th show product by sub categories
    const showSubs = () => 
        subs.map((s) => (
            <div
                key={s._id}
                onClick={() => handleSub(s)}
                className='p-1 m-1 badge bg-secondary'
                style={{cursor: 'pointer'}}
            >
                {s.name}
            </div>
        ));
        

    const handleSub = (sub) => {
        setSub(sub);
        dispatch({
            type: 'SEARCH_QUERY',
            payload: { text: '',}
        }); 
        setPrice([0,0]);
        setCategoryIds([]);
        setStar('');
        setBrand('');
        setColor('');
        setShipping('');
        fetchProducts({sub: sub});
    }

    //7th show products based on brand name
    const showBrands = () => brands.map((b,i) => 
        <Radio 
            value={b} 
            name={b} 
            key={i}
            checked={b === brand} 
            onChange={handleBrand} 
            className='pb-1 ps-4 pe-5'
        >
            {b}
        </Radio>
        )

    const handleBrand = (e) => {
        setSub('');
        dispatch({
            type: 'SEARCH_QUERY',
            payload: { text: '',}
        }); 
        setPrice([0,0]);
        setCategoryIds([]);
        setStar('');
        setColor('');
        setBrand(e.target.value);
        setShipping('');
        fetchProducts({brand: e.target.value});
    }

    //8th: show products based on colors
    const showColors = () => colors.map((c,i) => 
    <Radio 
        value={c} 
        name={c} 
        key={i}
        checked={c === color} 
        onChange={handleColor} 
        className='pb-1 ps-4 pe-5'
    >
        {c}
    </Radio>
    )

    const handleColor = (e) => {
        setSub('');
        dispatch({
            type: 'SEARCH_QUERY',
            payload: { text: '',}
        }); 
        setPrice([0,0]);
        setCategoryIds([]);
        setStar('');
        setBrand('');
        setColor(e.target.value);
        setShipping('');
        fetchProducts({color: e.target.value});
    }

    //9th show products based on shipping

    const showShipping = () => (
        <>
            <Checkbox 
                className="pb-2 px-4"
                onChange={handleShippingChange}
                value='Yes'
                checked={shipping === 'Yes'}
            >
                Yes
            </Checkbox>
            <Checkbox 
                className="pb-2 px-4"
                onChange={handleShippingChange}
                value='No'
                checked={shipping === 'No'}
            >
                No
            </Checkbox>
        </>
    );

    const handleShippingChange = (e) => {
        setSub('');
        dispatch({
            type: 'SEARCH_QUERY',
            payload: { text: '',}
        }); 
        setPrice([0,0]);
        setCategoryIds([]);
        setStar('');
        setBrand('');
        setColor('');
        setShipping(e.target.value)
        fetchProducts({shipping: e.target.value});
    }



    return (
        <div className="container-fluid">
            <div className="row">

                <div className="col-lg-2 pt-2 pb-4">
                    <h4>Search/Filter</h4>
                    <hr/>

                    <Menu defaultOpenKeys={["1","2","3","4","5","6","7"]} mode="inline">
                        {/* price */}
                        <SubMenu key="1" title={
                            <span className="h6">
                                <DollarOutlined /> Price
                            </span>
                        }>
                            <Slider 
                                className="mx-3" 
                                tipFormatter={(v) => `₹${v}`} 
                                range 
                                value={price} 
                                onChange={handleSlider} 
                                max='100000'
                            />  
                        </SubMenu>

                        {/* categories */}
                        <SubMenu key="2" title={
                            <span className="h6">
                                <DownSquareOutlined/> Categories
                            </span>
                        }>
                            {showCategories()}
                        </SubMenu>

                        {/* stars */}
                        <SubMenu key="3" title={
                            <span className="h6">
                                <StarOutlined/> Rating
                            </span>
                            
                        }>
                            {showStars()}
                        </SubMenu>

                        {/* sub categories */}
                        <SubMenu key="4" title={
                            <span className="h6">
                                <TagsOutlined /> Sub-Categories
                            </span>
                        }>
                            {showSubs()}
                        </SubMenu>

                        {/* brands */}
                        <SubMenu key="5" title={
                            <span className="h6">
                                <AntDesignOutlined /> Brands
                            </span>
                        }>
                            {showBrands()}
                        </SubMenu>

                        {/* color */}
                        <SubMenu key="6" title={
                            <span className="h6">
                                <BgColorsOutlined /> Color
                            </span>
                        }>
                            {showColors()}
                        </SubMenu>

                        {/* shipping */}
                        <SubMenu key="7" title={
                            <span className="h6">
                                <DownSquareOutlined/> Shipping
                            </span>
                        }>
                            {showShipping()}
                        </SubMenu>

                    </Menu>
                </div>

                <div className="col-lg-10">
                    {loading ? (
                        <h3 className="text-danger text-center">
                           Loading... 
                        </h3>
                    ) : (
                        <h3 className="text-center mt-3">Products</h3>
                    )}
                    {products.length <1 && <p>No products found</p>} 

                    <div className="row">
                        {products.map((p) => (
                            <div key={p._id} className='col-md-4 mb-3 '>
                                <ProductCard product={p}/>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )

}

export default Shop;