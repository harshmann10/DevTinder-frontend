function UserCard({ user, className }) {
    const { firstName, lastName, age, gender, about, photoUrl } = user;
    return (
        <div className={`card bg-base-300 w-96 shadow-xl ${className || ""}`}>
            <figure className="px-8 mx-5 max-h-80">
                <img src={photoUrl} alt="Photo" />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{firstName + " " + lastName}</h2>
                <p>{age && gender && age + ", " + gender}</p>
                <p className="whitespace-normal break-words">{about}</p>
                <div className="card-actions justify-center mt-2">
                    <button className="btn btn-success">Interested</button>
                    <button className="btn btn-outline btn-error">Ignore</button>
                </div>
            </div>
        </div>
    );
}

export default UserCard;
