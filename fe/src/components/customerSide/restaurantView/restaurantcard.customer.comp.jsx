import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import Typography from "@mui/material/Typography";

export const RestaurantcardCustomerComp = ({restaurant}) => {
    return (
        <Card>
            <CardHeader
                title={restaurant.name}
            />
            <CardMedia
                component="img"

                image={restaurant.image}
            />
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    Cuisine: {restaurant.cuisine}<br />
                    Opening Time: {restaurant.open_time}<br />
                    Closing Time: {restaurant.closing_time}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default RestaurantcardCustomerComp;