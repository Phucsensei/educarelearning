import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import * as TestService from "../../services/TestService";
import * as ClassService from "../../services/ClassService";
import { useParams } from "react-router-dom";

export default function ViewQuestionTest() {
  const [idTest, setIdTest] = useState("");
  const [password, setPassword] = useState("");
  const [timeStart, setTimeStart] = useState("");
  const [timeEnd, setTimeEnd] = useState("");
  const [question, setQuestion] = useState("");

  const { id } = useParams();

  const getDetailTest = async () => {
    const res = await TestService.getDetailTest(id);
    return res;
  };

  const { data: detailTest } = useQuery({
    queryKey: ["detailTest", id],
    queryFn: () => getDetailTest(id),
  });

  const handleSave = () => {
    console.log({
      idTest: detailTest?.data.iDTest,
      password: detailTest?.data.passwordTest,
      timeStart: detailTest?.data.timeStart,
      timeEnd: detailTest?.data.timeEnd,
      question: question,
    });
  };

  return (
    <div className="w-4/5 mx-auto mt-16 p-8 border border-gray-300 rounded-lg shadow-lg">
      <div className="mb-8 text-2xl font-bold text-center text-gray-800">
        Bai Test 1
      </div>
      <div className="grid grid-cols-2 gap-8">
        <div>
          <label className="block text-lg font-medium text-gray-700 mb-2">
            ID Test:
          </label>
          <input
            type="text"
            value={detailTest?.data.iDTest}
            onChange={(e) => setIdTest(e.target.value)}
            className="border border-gray-300 rounded p-3 w-full text-lg"
          />
        </div>
        <div>
          <label className="block text-lg font-medium text-gray-700 mb-2">
            Password:
          </label>
          <input
            type="password"
            value={detailTest?.data.passwordTest}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-gray-300 rounded p-3 w-full text-lg"
          />
        </div>
        <div>
          <label className="block text-lg font-medium text-gray-700 mb-2">
            Time start:
          </label>
          <input
            type="datetime-local"
            value={detailTest?.data.timeStart}
            onChange={(e) => setTimeStart(e.target.value)}
            className="border border-gray-300 rounded p-3 w-full text-lg"
          />
        </div>
        <div>
          <label className="block text-lg font-medium text-gray-700 mb-2">
            Time end:
          </label>
          <input
            type="datetime-local"
            value={detailTest?.data.timeEnd}
            onChange={(e) => setTimeEnd(e.target.value)}
            className="border border-gray-300 rounded p-3 w-full text-lg"
          />
        </div>
      </div>
      <div className="mt-8">
        <label className="block text-lg font-medium text-gray-700 mb-2">
          Question:
        </label>
        <div className="relative">
          <select
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="border border-gray-300 rounded p-3 w-full text-lg"
          >
            <option value="">Select a question</option>
            <option value="30">Random 30 question</option>
            <option value="45">Random 45 question</option>
            <option value="60">Random 60 question</option>
          </select>
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none"></div>
        </div>
      </div>
      <div className="mt-8 text-right">
        <button
          onClick={handleSave}
          className="bg-blue-500 text-white py-3 px-6 rounded text-lg hover:bg-blue-600 transition duration-300"
        >
          Save
        </button>
      </div>
    </div>
  );
}
