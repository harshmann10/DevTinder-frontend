function UserCard({ user }) {
    const { firstName, lastName, age, gender, about, photoUrl } = user;
    return (
        <div className="card bg-base-300 w-96 shadow-xl">
            <figure>
                <img className="mt-2" src={photoUrl} alt="Photo" />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{firstName + " " + lastName}</h2>
                <p>{age && gender && age + ", " + gender}</p>
                <p>{about}</p>
                <div className="card-actions justify-center mt-2">
                    <button className="btn btn-success">Interested</button>
                    <button className="btn btn-error">Ignore</button>
                </div>
            </div>
        </div>
    );
}

export default UserCard;
