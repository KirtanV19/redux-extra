import { useEffect } from "react";
import { fetchUsers } from "../redux/slices/Users.slice";
import { useDispatch, useSelector } from "react-redux";

const Users = () => {
    const dispatch = useDispatch();
    const { users, loading, error, lastUpdated } = useSelector((state) => state.users);

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
