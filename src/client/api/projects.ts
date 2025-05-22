import { BaseTestRailClient } from "./baseClient.js";
import {
	GetProjectInput,
	AddProjectInput,
	UpdateProjectInput,
	DeleteProjectInput,
	TestRailProject,
} from "../../shared/schemas/projects.js";
import { handleApiError } from "./utils.js";

export class ProjectsClient extends BaseTestRailClient {
	/**
	 * Get a specific project
	 */
	async getProject(
		projectId: GetProjectInput["projectId"],
	): Promise<TestRailProject> {
		try {
			// Use the request method from BaseTestRailClient which URL-encodes the path
			return await this.request<TestRailProject>("get", `/api/v2/get_project/${projectId}`);
		} catch (error) {
			throw handleApiError(error, `Failed to get project ${projectId}`);
		}
	}

	/**
	 * Get all projects
	 */
	async getProjects(
		params?: Record<string, string | number | boolean | null | undefined>,
	): Promise<TestRailProject[]> {
		try {
			// Use the request method from BaseTestRailClient which URL-encodes the path
			return await this.request<TestRailProject[]>("get", "/api/v2/get_projects", params);
		} catch (error) {
			throw handleApiError(error, "Failed to get projects");
		}
	}
}
