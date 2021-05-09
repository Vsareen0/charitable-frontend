import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  CardActions,
  CardImage,
  CardSubtitle,
} from "@progress/kendo-react-layout";
import { Slide } from "@progress/kendo-react-animation";
import { DropDownButton } from "@progress/kendo-react-buttons";
import dayjs from "dayjs";

const MiniCard = ({ iconType, items, dataItem, handleItemClick }) => {
  let {
    cause_name: title,
    description: body,
    createdAt: date,
    _id,
    image,
  } = dataItem;
  date = dayjs(date).format("DD-MM-YYYY H:mm");

  return (
    <Slide>
      <Card orientation="horizontal" style={{ width: "360px", margin: "10px" }}>
        <CardImage src={image} />
        <div className="k-vbox">
          <CardHeader>
            <div className="flex justify-between flex-grow">
              <div className="flex flex-col">
                <CardTitle>
                  {title.length > 15 ? `${title.substring(0, 14)}...` : title}
                </CardTitle>
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
          <CardBody>
            <div
              dangerouslySetInnerHTML={{
                __html: body.length > 40 ? `${body.substring(0, 36)}...` : body,
              }}
            ></div>
          </CardBody>
        </div>
      </Card>
    </Slide>
  );
};

export default MiniCard;
