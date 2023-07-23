import moment from "moment";

function LenderTable({lenderData }) {

  return (
      <table className="min-w-full leading-normal font-nunito rounded-md">
      <thead>
        <tr>
          <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
            No
          </th>
          <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
            Member
          </th>
          <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
            Book
          </th>
          <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
            Checkout date
          </th>
          <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
            Due date
          </th>
          <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
            Return date
          </th>
          <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
            Status
          </th>
          <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
            Fine
          </th>
        </tr>
      </thead>
      <tbody>
        {lenderData &&
          lenderData.map((data, i) => {
            return (
              data.member &&
              <tr key={data._id}>
                <td className="px-5 py-5 border-b text-black border-gray-200 bg-white text-sm">
                  <span>{i + 1}</span>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <div className="flex">
                    <div className="flex-shrink-0 w- h-10">
                      <img
                        className="w-full h-full rounded-full"
                        src={
                          data.member?.profilePicture
                            ? data.member?.profilePicture
                            : "../../../public/public-images/image.jpg"
                        }
                        // src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.2&w=160&h=160&q=80"
                        alt=""
                      />
                    </div>
                    <div className="ml-3">
                      <p className="text-gray-900 whitespace-no-wrap font-semibold">
                        {data.member.name}
                      </p>
                      <p className="text-gray-600 whitespace-no-wrap">
                        {data.member.membershipId}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <p className="text-gray-900 whitespace-no-wrap">
                    {data.book.title}
                  </p>
                  <p className="text-gray-600 whitespace-no-wrap">
                    {data.book.author}
                  </p>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <p className="text-gray-900 whitespace-no-wrap">
                    {moment(data.checkoutDate).format(
                      "MMM Do YY hh:mm:ss"
                    )}
                  </p>
                  <p className="text-gray-600 whitespace-no-wrap">
                    {data.status === "Pending" ? (
                      <div>
                        <span>Expires in</span>
                        {moment(data.expiresIn).format(
                          "MMM Do YY hh:mm:ss"
                        )}
                      </div>
                    ) : (
                      ""
                    )}
                  </p>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <p className="text-gray-900 whitespace-no-wrap">
                    {moment(data.dueDate).format("MMM Do YY")}
                  </p>
                  <p className="text-gray-600 whitespace-no-wrap"></p>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <p className="text-gray-900 whitespace-no-wrap">
                    {data.returnDate
                      ? moment(data.returnDate).format(
                          "MMM Do YY"
                        )
                      : "Not returned"}
                  </p>
                  <p className="text-gray-600 whitespace-no-wrap"></p>
                </td>
                <td className="px-5 py-5 border-b text-black border-gray-200 bg-white text-sm">
                  {data.status}
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <p
                    className={`${
                      !data.hasFinePaid
                        ? "text-red-600 font-bold"
                        : "text-green-700 font-semibold"
                    } text-gray-900 whitespace-no-wrap`}
                  >
                    {data.fineAmount}
                  </p>
                  <p className="text-gray-600 whitespace-no-wrap"></p>
                </td>
              </tr>
            );
          })}
      </tbody>
    </table>
  )
}

export default LenderTable