import { RestaurantcardCustomerComp } from "./restaurantcard.customer.comp";

export const RestaurantcardlistCustomerComp = ({ restaurants, activeCustomer }) => {
    return (
        <div
            style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent:'center' }}
        >
            {restaurants.map((restaurant, index) => (
                <RestaurantcardCustomerComp key={index} restaurant={restaurant} activeCustomer={activeCustomer} />
            ))}
        </div>
    );
};

export default RestaurantcardlistCustomerComp;