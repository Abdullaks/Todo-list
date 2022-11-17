import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { completeGoal, deleteGoal } from "../features/goals/goalSlice";
// import { AiFillDelete } from "react-icons";
import {
  AiFillDelete,
  AiOutlineCheck,
} from "react-icons/ai";
import { useNavigate } from "react-router-dom";
function GoalItem({ goal }) {
  const dispatch = useDispatch();


  return (
    <div className="goal">
      <div>{new Date(goal.createdAt).toLocaleString("en-US")}</div>
      <h2>{goal.text}</h2>
      <button onClick={() => dispatch(deleteGoal(goal._id))} className="close">
        <AiFillDelete />
      </button>
      <button onClick={() => dispatch(completeGoal(goal._id))} className="done">
        <AiOutlineCheck />
      </button>
    </div>
  );
}

export default GoalItem;
