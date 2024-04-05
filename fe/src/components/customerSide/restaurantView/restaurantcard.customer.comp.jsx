import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import Typography from "@mui/material/Typography";
import {Link} from "react-router-dom";
const convertTimeFormat = (timeString) => {
    // Convert the time string to hours and minutes
    const hours = parseInt(timeString.substring(0, 2));
    const minutes = parseInt(timeString.substring(2, 4));

    // Determine AM or PM
    const period = hours >= 12 ? 'PM' : 'AM';

    // Convert hours to 12-hour format
    const hours12 = hours % 12 || 12;

    // Pad minutes with leading zero if needed
    const paddedMinutes = String(minutes).padStart(2, '0');

    // Construct the formatted time string
    const formattedTime = `${hours12}:${paddedMinutes} ${period}`;

    return formattedTime;
};
export const RestaurantcardCustomerComp = ({restaurant}) => {
    const openingTime = convertTimeFormat(restaurant.open_time);
    const closingTime = convertTimeFormat(restaurant.closing_time);
    return (
        <Link to={`/customerOrder/${restaurant._id}`} style={{ textDecoration: 'none' }}>
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
                    Opening Time: {openingTime}<br />
                    Closing Time: {closingTime}
                </Typography>
            </CardContent>
        </Card>
        </Link>
    );
};

export default RestaurantcardCustomerComp;