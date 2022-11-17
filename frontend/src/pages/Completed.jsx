import React, { useEffect } from "react";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteGoal } from "../features/goals/goalSlice";
import { getGoals } from "../features/goals/goalSlice";

const Completed = () => {
  const { user } = useSelector((state) => state.auth);

  const { goals, isLoading, isError, message } = useSelector(
    (state) => state.goals
  );
const completed=  goals.filter((obj) => obj.isCompleted === true);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
    dispatch(getGoals());
  }, [user]);
  return (
    <section className="content" style={{ margin: "10px" }}>
      <h3>Completed</h3>

      {completed.length > 0 ? (
        <div className="goals">
          {completed.map((goal) => (
            <div key={goal._id} className="goal">
              <div>{new Date(goal.createdAt).toLocaleString("en-US")}</div>
              <h2>{goal.text}</h2>
              <button
                onClick={() => dispatch(deleteGoal(goal._id))}
                className="close"
              >
                <AiFillDelete />
              </button>
            </div>
          ))}
        </div>
      ) : (
        <h3>You have not completed any goals</h3>
      )}
    </section>
  );
};

export default Completed;

