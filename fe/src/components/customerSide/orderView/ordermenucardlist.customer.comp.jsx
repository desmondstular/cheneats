import { OrderMenuCardCustomerComp } from './ordermenucard.customer.comp.jsx';

export const OrderMenuCardListCustomerComp = ({ menu }) => {
    return (
        <div
            style={{ display: 'flex', flexDirection: 'column',  overflowY: 'auto'}}
        >
            {menu.map((menuItem, index) => (
                <OrderMenuCardCustomerComp index={index} menuItem={menuItem}></OrderMenuCardCustomerComp>
            ))}
        </div>
    );
};

export default OrderMenuCardListCustomerComp;