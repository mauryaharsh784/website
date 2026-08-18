import { useEffect, useMemo, useState } from "react";

const API_URL = "http://localhost:5000";
const ITEMS_PER_PAGE = 10;

export default function AdminDashboard() {
  const [grievances, setGrievances] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  // ================================
  // Token
  // ================================

  const getToken = () => {
    return localStorage.getItem("adminToken");
  };

  // ================================
  // Logout
  // ================================

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("admin");
    localStorage.removeItem("isAdmin");

    window.location.href = "/admin/login";
  };

  // ================================
  // Fetch Grievances
  // ================================

  const fetchGrievances = async () => {
    try {
      setLoading(true);
      setError("");

      const token = getToken();

      if (!token) {
        window.location.href = "/admin/login";
        return;
      }

      const response = await fetch(
        `${API_URL}/api/grievances`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (response.status === 401) {
        handleLogout();
        return;
      }

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to fetch grievances"
        );
      }

      setGrievances(data.grievances || []);
    } catch (error) {
      console.error(
        "Fetch grievances error:",
        error
      );

      setError(
        "Unable to load grievances"
      );
    } finally {
      setLoading(false);
    }
  };

  // ================================
  // Initial Fetch
  // ================================

  useEffect(() => {
    fetchGrievances();
  }, []);

  // ================================
  // Search + Filter
  // ================================

  const filteredGrievances = useMemo(() => {
    const searchText = search
      .toLowerCase()
      .trim();

    return grievances.filter((item) => {
      const matchesSearch =
        !searchText ||
        item.name
          ?.toLowerCase()
          .includes(searchText) ||
        item.email
          ?.toLowerCase()
          .includes(searchText) ||
        item.mobile
          ?.toLowerCase()
          .includes(searchText) ||
        item.address
          ?.toLowerCase()
          .includes(searchText) ||
        item.category
          ?.toLowerCase()
          .includes(searchText) ||
        item.description
          ?.toLowerCase()
          .includes(searchText) ||
        item.referenceNumber
          ?.toLowerCase()
          .includes(searchText);

      const matchesStatus =
        statusFilter === "All" ||
        item.status === statusFilter;

      return (
        matchesSearch &&
        matchesStatus
      );
    });
  }, [
    grievances,
    search,
    statusFilter,
  ]);

  // ================================
  // Pagination
  // ================================

  const totalPages = Math.max(
    1,
    Math.ceil(
      filteredGrievances.length /
        ITEMS_PER_PAGE
    )
  );

  const paginatedGrievances =
    filteredGrievances.slice(
      (currentPage - 1) *
        ITEMS_PER_PAGE,
      currentPage * ITEMS_PER_PAGE
    );

  // ================================
  // Update Status
  // ================================

  const updateStatus = async (
    id,
    status
  ) => {
    try {
      const token = getToken();

      if (!token) {
        handleLogout();
        return;
      }

      const response = await fetch(
        `${API_URL}/api/grievances/${id}/status`,
        {
          method: "PATCH",

          headers: {
            "Content-Type":
              "application/json",

            Authorization:
              `Bearer ${token}`,
          },

          body: JSON.stringify({
            status,
          }),
        }
      );

      const data =
        await response.json();

      if (response.status === 401) {
        handleLogout();
        return;
      }

      if (!response.ok) {
        alert(
          data.message ||
            "Unable to update status"
        );
        return;
      }

      setGrievances((previous) =>
        previous.map((item) =>
          item._id === id
            ? {
                ...item,
                status:
                  data.grievance.status,
              }
            : item
        )
      );
    } catch (error) {
      console.error(
        "Update status error:",
        error
      );

      alert(
        "Unable to connect to server"
      );
    }
  };

  // ================================
  // Delete Grievance
  // ================================

  const deleteGrievance = async (id) => {
    const confirmed =
      window.confirm(
        "Are you sure you want to delete this grievance?"
      );

    if (!confirmed) {
      return;
    }

    try {
      const token = getToken();

      if (!token) {
        handleLogout();
        return;
      }

      const response = await fetch(
        `${API_URL}/api/grievances/${id}`,
        {
          method: "DELETE",

          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

      const data =
        await response.json();

      if (response.status === 401) {
        handleLogout();
        return;
      }

      if (!response.ok) {
        alert(
          data.message ||
            "Unable to delete grievance"
        );
        return;
      }

      setGrievances((previous) =>
        previous.filter(
          (item) => item._id !== id
        )
      );

      if (
        paginatedGrievances.length === 1 &&
        currentPage > 1
      ) {
        setCurrentPage(
          (previous) =>
            previous - 1
        );
      }
    } catch (error) {
      console.error(
        "Delete grievance error:",
        error
      );

      alert(
        "Unable to connect to server"
      );
    }
  };

  // ================================
  // Reset Page When Search Changes
  // ================================

  useEffect(() => {
    if (
      currentPage > totalPages
    ) {
      setCurrentPage(totalPages);
    }
  }, [
    currentPage,
    totalPages,
  ]);

  // ================================
  // Loading
  // ================================

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-green-700" />

          <p className="text-lg text-gray-600">
            Loading grievances...
          </p>
        </div>
      </div>
    );
  }

  // ================================
  // Error
  // ================================

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
        <div className="rounded-xl bg-white p-8 text-center shadow-sm">
          <p className="mb-4 text-red-600">
            {error}
          </p>

          <button
            onClick={fetchGrievances}
            className="rounded-lg bg-green-700 px-5 py-2 text-white hover:bg-green-800"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // ================================
  // Dashboard
  // ================================

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Grievance Dashboard
            </h1>

            <p className="mt-1 text-gray-500">
              Manage citizen grievances
              and enquiries
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={fetchGrievances}
              className="rounded-lg bg-green-700 px-5 py-2.5 font-medium text-white hover:bg-green-800"
            >
              Refresh
            </button>

            <button
              onClick={handleLogout}
              className="rounded-lg bg-red-600 px-5 py-2.5 font-medium text-white hover:bg-red-700"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

          {/* Total */}
          <div className="rounded-xl bg-white p-5 shadow-sm">
            <p className="text-sm text-gray-500">
              Total
            </p>

            <p className="mt-2 text-3xl font-bold text-gray-900">
              {grievances.length}
            </p>
          </div>

          {/* Pending */}
          <div className="rounded-xl bg-white p-5 shadow-sm">
            <p className="text-sm text-gray-500">
              Pending
            </p>

            <p className="mt-2 text-3xl font-bold text-yellow-600">
              {
                grievances.filter(
                  (item) =>
                    item.status ===
                    "Pending"
                ).length
              }
            </p>
          </div>

          {/* In Progress */}
          <div className="rounded-xl bg-white p-5 shadow-sm">
            <p className="text-sm text-gray-500">
              In Progress
            </p>

            <p className="mt-2 text-3xl font-bold text-blue-600">
              {
                grievances.filter(
                  (item) =>
                    item.status ===
                    "In Progress"
                ).length
              }
            </p>
          </div>

          {/* Resolved */}
          <div className="rounded-xl bg-white p-5 shadow-sm">
            <p className="text-sm text-gray-500">
              Resolved
            </p>

            <p className="mt-2 text-3xl font-bold text-green-600">
              {
                grievances.filter(
                  (item) =>
                    item.status ===
                    "Resolved"
                ).length
              }
            </p>
          </div>
        </div>

        {/* Search + Filter */}
        <div className="mb-6 flex flex-col gap-3 rounded-xl bg-white p-4 shadow-sm md:flex-row">

          <input
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(
                e.target.value
              );
              setCurrentPage(1);
            }}
            placeholder="Search name, email, mobile, category..."
            className="flex-1 rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-green-600"
          />

          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(
                e.target.value
              );
              setCurrentPage(1);
            }}
            className="rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none focus:border-green-600"
          >
            <option value="All">
              All Status
            </option>

            <option value="Pending">
              Pending
            </option>

            <option value="In Progress">
              In Progress
            </option>

            <option value="Resolved">
              Resolved
            </option>
          </select>
        </div>

        {/* Result Count */}
        <div className="mb-4 text-sm text-gray-500">
          Showing{" "}
          {paginatedGrievances.length}{" "}
          of{" "}
          {filteredGrievances.length}{" "}
          grievances
        </div>

        {/* Grievances */}
        <div className="space-y-4">

          {paginatedGrievances.length ===
          0 ? (
            <div className="rounded-xl bg-white p-10 text-center shadow-sm">
              <p className="text-gray-500">
                No grievances found.
              </p>
            </div>
          ) : (
            paginatedGrievances.map(
              (grievance) => (
                <div
                  key={grievance._id}
                  className="rounded-xl bg-white p-6 shadow-sm"
                >
                  <div className="flex flex-col gap-6 lg:flex-row lg:justify-between">

                    {/* Details */}
                    <div className="flex-1">

                      {/* Title */}
                      <div className="mb-4 flex flex-wrap items-center gap-3">

                        <h2 className="text-xl font-semibold text-gray-900">
                          {grievance.category ||
                            "Grievance"}
                        </h2>

                        <span
                          className={`rounded-full px-3 py-1 text-xs font-medium ${
                            grievance.status ===
                            "Resolved"
                              ? "bg-green-100 text-green-700"
                              : grievance.status ===
                                "In Progress"
                              ? "bg-blue-100 text-blue-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {grievance.status ||
                            "Pending"}
                        </span>
                      </div>

                      {/* Reference */}
                      {grievance.referenceNumber && (
                        <p className="mb-4 text-sm text-gray-500">
                          <strong>
                            Reference:
                          </strong>{" "}
                          {
                            grievance.referenceNumber
                          }
                        </p>
                      )}

                      {/* User Details */}
                      <div className="grid gap-3 text-sm text-gray-600 sm:grid-cols-2">

                        <p>
                          <strong>
                            Name:
                          </strong>{" "}
                          {grievance.name ||
                            "Not provided"}
                        </p>

                        <p>
                          <strong>
                            Mobile:
                          </strong>{" "}
                          {grievance.mobile ||
                            "Not provided"}
                        </p>

                        <p>
                          <strong>
                            Email:
                          </strong>{" "}
                          {grievance.email ||
                            "Not provided"}
                        </p>

                        <p>
                          <strong>
                            Address:
                          </strong>{" "}
                          {grievance.address ||
                            "Not provided"}
                        </p>

                        <p>
                          <strong>
                            Category:
                          </strong>{" "}
                          {grievance.category ||
                            "Other"}
                        </p>

                        <p>
                          <strong>
                            Date:
                          </strong>{" "}
                          {grievance.createdAt
                            ? new Date(
                                grievance.createdAt
                              ).toLocaleDateString(
                                "en-IN"
                              )
                            : "N/A"}
                        </p>
                      </div>

                      {/* Description */}
                      <div className="mt-5 rounded-lg bg-gray-50 p-4">
                        <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-gray-500">
                          Description
                        </p>

                        <p className="text-sm leading-relaxed text-gray-700">
                          {grievance.description ||
                            "No description provided"}
                        </p>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col gap-3 lg:w-48">

                      <select
                        value={
                          grievance.status ||
                          "Pending"
                        }
                        onChange={(e) =>
                          updateStatus(
                            grievance._id,
                            e.target.value
                          )
                        }
                        className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-green-600"
                      >
                        <option value="Pending">
                          Pending
                        </option>

                        <option value="In Progress">
                          In Progress
                        </option>

                        <option value="Resolved">
                          Resolved
                        </option>
                      </select>

                      <button
                        onClick={() =>
                          deleteGrievance(
                            grievance._id
                          )
                        }
                        className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              )
            )
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-8 flex items-center justify-center gap-2">

            <button
              disabled={
                currentPage === 1
              }
              onClick={() =>
                setCurrentPage(
                  (previous) =>
                    previous - 1
                )
              }
              className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-40"
            >
              Previous
            </button>

            <span className="px-4 text-sm text-gray-600">
              Page {currentPage} of{" "}
              {totalPages}
            </span>

            <button
              disabled={
                currentPage ===
                totalPages
              }
              onClick={() =>
                setCurrentPage(
                  (previous) =>
                    previous + 1
                )
              }
              className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-40"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}