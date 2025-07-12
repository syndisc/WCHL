import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "../../components/ui/card";
import { Button } from "../../components/ui/button";

export default function MyCertificate() {
  const certificates = [
    {
      course: "React for Beginners",
      completedAt: "July 10, 2025",
      link: "/certificates/react-beginners.pdf"
    },
    {
      course: "Intro to Web3",
      completedAt: "July 8, 2025",
      link: "/certificates/web3-intro.pdf"
    },
    {
      course: "Advanced JavaScript",
      completedAt: "June 30, 2025",
      link: "/certificates/advanced-js.pdf"
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">My Certificates</h1>
        <p className="text-gray-600 mt-2">
          View and download your course certificates below:
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Your Certificates</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-left border border-gray-200">
              <thead className="bg-gray-100 text-gray-700">
                <tr>
                  <th className="px-4 py-3 border-b">Course</th>
                  <th className="px-4 py-3 border-b">Completed At</th>
                  <th className="px-4 py-3 border-b">Action</th>
                </tr>
              </thead>
              <tbody>
                {certificates.map((cert, index) => (
                  <tr key={index} className="border-t">
                    <td className="px-4 py-3">{cert.course}</td>
                    <td className="px-4 py-3">{cert.completedAt}</td>
                    <td className="px-4 py-3">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => window.open(cert.link, "_blank")}
                      >
                        View
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
