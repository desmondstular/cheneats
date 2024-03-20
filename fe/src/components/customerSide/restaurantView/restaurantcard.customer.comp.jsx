import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import Typography from "@mui/material/Typography";
import {Link} from "react-router-dom";

export const RestaurantcardCustomerComp = ({restaurant, activeCustomer}) => {
    return (
        <Link to={`/customerOrder/${restaurant._id}/${activeCustomer}`} style={{ textDecoration: 'none' }}>
        <Card
        style={{maxWidth:400, maxHeight: 400, width: 'auto', height: 'auto', margin: '8px 4px'}}>
            <CardHeader
                title={restaurant.name}
            />
            <CardMedia
                component="img"
                image={restaurant.image}
                style={{ maxWidth: 200, maxHeight: 200, width: 'auto', height: 'auto', margin: 'auto'}}
            />
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    Cuisine: {restaurant.cuisine}<br />
                    Opening Time: {restaurant.open_time}<br />
                    Closing Time: {restaurant.close_time}
                </Typography>
            </CardContent>
        </Card>
        </Link>
    );
};

export default RestaurantcardCustomerComp;