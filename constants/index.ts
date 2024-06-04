import { MdHome, MdOutlineWorkOutline, MdWork } from "react-icons/md";
import { FaRegUser, FaUser } from "react-icons/fa";
import { GrHomeRounded } from "react-icons/gr";
import { BsPatchQuestionFill, BsPatchQuestion } from "react-icons/bs";
import { IoPricetags, IoPricetagsOutline } from "react-icons/io5";
import { PiUsersThreeFill, PiUsersThreeLight } from "react-icons/pi";

export const sidebarLinks = [
  {
    icon: GrHomeRounded,
    active: MdHome,
    route: "/",
    label: "Home",
  },
  {
    icon: PiUsersThreeLight,
    active: PiUsersThreeFill,
    route: "/users",
    label: "Users",
  },
  // {
  //   icon: MdHome,
  //   active: MdHome,
  //   route: "/collection",
  //   label: "Collections",
  // },
  {
    icon: MdOutlineWorkOutline,
    active: MdWork,
    route: "/jobs",
    label: "Find Jobs",
  },
  {
    icon: IoPricetagsOutline,
    active: IoPricetags,
    route: "/tags",
    label: "Tags",
  },
  {
    icon: FaRegUser,
    active: FaUser,
    route: "/profile",
    label: "Profile",
  },
  {
    icon: BsPatchQuestion,
    active: BsPatchQuestionFill,
    route: "/askQuestion",
    label: "Ask a question",
  },
];

export const BADGE_CRITERIA = {
  QUESTION_COUNT: {
    BRONZE: 10,
    SILVER: 50,
    GOLD: 100,
  },
  ANSWER_COUNT: {
    BRONZE: 10,
    SILVER: 50,
    GOLD: 100,
  },
  QUESTION_UPVOTES: {
    BRONZE: 10,
    SILVER: 50,
    GOLD: 100,
  },
  ANSWER_UPVOTES: {
    BRONZE: 10,
    SILVER: 50,
    GOLD: 100,
  },
  TOTAL_VIEWS: {
    BRONZE: 1000,
    SILVER: 10000,
    GOLD: 100000,
  },
};
