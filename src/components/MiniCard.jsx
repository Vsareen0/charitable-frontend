import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  CardActions,
  CardImage,
  CardSubtitle,
} from "@progress/kendo-react-layout";
import { DropDownButton } from "@progress/kendo-react-buttons";
import dayjs from "dayjs";

const MiniCard = ({ iconType, items, data, image, handleItemClick }) => {
  let { cause_name: title, description: body, createdAt: date, _id } = data;
  date = dayjs(date).format("DD-MM-YYYY H:mm");

  return (
    <Card orientation="horizontal">
      <CardImage src={image} />
      <div className="k-vbox">
        <CardHeader>
          <div className="flex justify-between">
            <div className="flex flex-col">
              <CardTitle>{title}</CardTitle>
              <CardSubtitle>{date}</CardSubtitle>
            </div>
            <div>
              <CardActions layout="end">
                <DropDownButton
                  onItemClick={() => handleItemClick(_id)}
                  items={items}
                  icon={iconType}
                />
              </CardActions>
            </div>
          </div>
        </CardHeader>
        <CardBody>{body}</CardBody>
      </div>
    </Card>
  );
};

export default MiniCard;
