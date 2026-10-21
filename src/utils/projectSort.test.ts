import { pickFeaturedProjects, sortProjectsByRecency } from "./projectSort";
import type { Project } from "@/types/domain";

const p = (id: string, over: Partial<Project> = {}): Project =>
  ({
    id,
    title: id,
    description: "",
    technologies: [],
    category: "web",
    startDate: "2024-01-01",
    isActive: false,
    ...over,
  }) as Project;

describe("project ordering", () => {
  test("active first, then open-ended, then newest start", () => {
    const list = [
      p("old", { startDate: "2020-01-01", endDate: "2021-01-01" }),
      p("new", { startDate: "2025-01-01", endDate: "2025-06-01" }),
      p("active", { startDate: "2019-01-01", isActive: true }),
    ];
    expect(sortProjectsByRecency(list).map((x) => x.id)).toEqual([
      "active",
      "new",
      "old",
    ]);
  });

  test("does not mutate its input", () => {
    const list = [p("a"), p("b", { isActive: true })];
    const copy = [...list];
    sortProjectsByRecency(list);
    expect(list).toEqual(copy);
  });

  test("featured picks the requested count", () => {
    const list = ["a", "b", "c", "d"].map((id) => p(id, { isActive: true }));
    expect(pickFeaturedProjects(list, 2)).toHaveLength(2);
  });
});
