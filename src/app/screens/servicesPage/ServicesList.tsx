import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import Container from "@mui/material/Container";
import Pagination from "@mui/material/Pagination";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";

import { setServices } from "./slice";
import { retrieveServices } from "./selector";
import ServiceCard from "../../components/cards/ServiceCard";
import EmptyState from "../../components/common/EmptyState";
import Loader from "../../components/common/Loader";

import CuttingService from "../../services/CuttingService";
import { Service, ServiceInquiry } from "../../../lib/types/service";
import { CartItem } from "../../../lib/types/search";
import {
  ServiceCollection,
  ServiceSort,
} from "../../../lib/enums/service.enum";
import { PAGE_LIMIT } from "../../../lib/config";
import { humanizeEnum } from "../../../lib/utils/format";

const actionDispatch = (dispatch: Dispatch) => ({
  setServices: (data: Service[]) => dispatch(setServices(data)),
});

const servicesRetriever = createSelector(
  retrieveServices,
  (services) => ({ services })
);

const COLLECTIONS = Object.values(ServiceCollection);

const SORTS: { key: string; label: string }[] = [
  { key: ServiceSort.NEW, label: "Newest" },
  { key: ServiceSort.PRICE, label: "Price" },
  { key: ServiceSort.VIEWS, label: "Popular" },
];

interface ServicesListProps {
  onAdd: (item: CartItem) => void;
}

export default function ServicesList({ onAdd }: ServicesListProps) {
  const { setServices } = actionDispatch(useDispatch());
  const { services } = useSelector(servicesRetriever);

  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [page, setPage] = useState(1);

  const [inquiry, setInquiry] = useState<ServiceInquiry>({
    booking: ServiceSort.NEW,
    page: 1,
    limit: PAGE_LIMIT.services,
  });

  useEffect(() => {
    let alive = true;
    setLoading(true);

    const cutting = new CuttingService();
    cutting
      .getServices(inquiry)
      .then((data) => {
        if (!alive) return;
        setServices(data);
      })
      .catch((err) => console.error("ServicesList:", err))
      .finally(() => {
        if (alive) setLoading(false);
      });

    return () => {
      alive = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inquiry]);

  const collectionHandler = (collection?: ServiceCollection) => {
    setPage(1);
    setInquiry((prev) => ({
      ...prev,
      page: 1,
      serviceCollection: collection,
    }));
  };

  const sortHandler = (booking: string) => {
    setPage(1);
    setInquiry((prev) => ({ ...prev, page: 1, booking }));
  };

  const searchHandler = () => {
    setPage(1);
    setInquiry((prev) => ({ ...prev, page: 1, search: searchText.trim() }));
  };

  const clearSearchHandler = () => {
    setSearchText("");
    setPage(1);
    setInquiry((prev) => ({ ...prev, page: 1, search: "" }));
  };

  const paginationHandler = (_e: ChangeEvent<unknown>, value: number) => {
    setPage(value);
    setInquiry((prev) => ({ ...prev, page: value }));
    listTopRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const listTopRef = useRef<HTMLDivElement | null>(null);

  const hasNextPage = services.length === inquiry.limit;
  const pageCount = hasNextPage ? page + 1 : page;

  return (
    <Container maxWidth="lg">
      <div className="ck-filter-bar" ref={listTopRef}>
        <div className="ck-chip-row">
          <button
            className={!inquiry.serviceCollection ? "ck-chip active" : "ck-chip"}
            onClick={() => collectionHandler(undefined)}
          >
            All
          </button>
          {COLLECTIONS.map((collection) => (
            <button
              key={collection}
              className={
                inquiry.serviceCollection === collection
                  ? "ck-chip active"
                  : "ck-chip"
              }
              onClick={() => collectionHandler(collection)}
            >
              {humanizeEnum(collection)}
            </button>
          ))}
        </div>

        <div className="ck-search-box">
          <SearchIcon sx={{ fontSize: 18, color: "var(--muted)" }} />
          <input
            type="search"
            placeholder="Search services"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && searchHandler()}
            aria-label="Search services"
          />
          {searchText ? (
            <IconButton size="small" onClick={clearSearchHandler}>
              <CloseIcon sx={{ fontSize: 15 }} />
            </IconButton>
          ) : null}
        </div>

        <div className="ck-sort-group">
          {SORTS.map((sort) => (
            <button
              key={sort.key}
              className={
                inquiry.booking === sort.key ? "ck-sort-btn active" : "ck-sort-btn"
              }
              onClick={() => sortHandler(sort.key)}
            >
              {sort.label}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <Loader text="Loading services…" />
      ) : services.length === 0 ? (
        <EmptyState
          title="No services found"
          text="Try a different filter or clear the search."
        />
      ) : (
        <>
          <div className="ck-card-grid">
            {services.map((service) => (
              <ServiceCard key={service._id} service={service} onAdd={onAdd} />
            ))}
          </div>

          {pageCount > 1 ? (
            <div className="ck-pagination-wrap">
              <Pagination
                count={pageCount}
                page={page}
                onChange={paginationHandler}
                shape="rounded"
                color="primary"
              />
            </div>
          ) : null}
        </>
      )}
    </Container>
  );
}
