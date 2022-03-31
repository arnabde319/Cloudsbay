import React from 'react';
import Jumbotron from '../components/cards/jumbotron';
import NewArrivals from '../components/home/NewApprivals';
import BestSeller from '../components/home/BestSeller';
import CategoryList from '../components/category/CategoryList';
import SubList from '../components/sub/SubList';


const Home = () => {

    return (
        <>
            <div className="p-4 mb-4 rounded-3" style={{"backgroundColor": "#EFEFEF"}}>
                <div className="container-fluid py-5 display-5 fw-bold text-center text-danger">
                    <Jumbotron text={['Latest Products','New Arrivals','Best Sellers']} />
                </div>
            </div>

            <h4 className='text-center p-3 mt-5 mb-5 display-6' style={{'backgroundColor': '#EFEFEF'}}>
                New Arrivals
            </h4>
            <NewArrivals/>
            <br/>
            <h4 className='text-center p-3 mt-5 mb-5 display-6' style={{'backgroundColor': '#EFEFEF'}}>
                Best Sellers
            </h4>
            <BestSeller/>
            <br/>
            <h4 className='text-center p-3 mt-5 mb-5 display-6' style={{'backgroundColor': '#EFEFEF'}}>
                Categories
            </h4>
            <CategoryList/>
            
            <h4 className='text-center p-3 mt-5 mb-5 display-6' style={{'backgroundColor': '#EFEFEF'}}>
                Sub-Categories
            </h4>
            <SubList />
            <br/>
        </>
    );
};

export default Home;