import { useEffect } from "react";
import {
    fetchUsers,
    addNonSerializable,
} from "../redux/slices/Users.slice";
import { useDispatch, useSelector } from "react-redux";

const Users = () => {
    const dispatch = useDispatch();
    const { users, loading, error, lastUpdated } = useSelector(
        (state) => state.users
    );

    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <>
            {lastUpdated && (
                <p>Last Updated: {new Date(lastUpdated).toLocaleString()}</p>
            )}
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}

            <button onClick={() => dispatch(addNonSerializable())}>
                Add Non-Serializable Value
            </button>

            {/* <button
                onClick={() =>
                    dispatch(
                        mutateUsersDirectly({
                            id: 123,
                            name: "Test",
                            email: "test@example.com",
                        })
                    )
                }
            >
                Trigger Mutation Bug
            </button> */}

            <ul>
                {users.map((user) => (
                    <li key={user.id}>
                        {user.name} — {user.email}
                    </li>
                ))}
            </ul>
        </>
    );
};

export default Users;
