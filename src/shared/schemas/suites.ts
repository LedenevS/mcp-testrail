import { z } from "zod";

// Schema for retrieving all suites in a project
export const getSuitesSchema = z.object({
	projectId: z.number().describe("TestRail Project ID"),
});

// Schema for retrieving a specific suite
export const getSuiteSchema = z.object({
	suiteId: z.number().describe("TestRail Suite ID"),
});

// Schema for adding a suite
export const addSuiteSchema = z.object({
	projectId: z.number().describe("TestRail Project ID"),
	name: z.string().describe("Name of the suite"),
	description: z.string().optional().describe("Description of the suite"),
});

// Schema for updating a suite
export const updateSuiteSchema = z.object({
	suiteId: z.number().describe("TestRail Suite ID"),
	name: z.string().optional().describe("Name of the suite"),
	description: z.string().optional().describe("Description of the suite"),
});

// Schema for deleting a suite
export const deleteSuiteSchema = z.object({
	suiteId: z.number().describe("TestRail Suite ID"),
});

// Create Zod objects from each schema
export const getSuitesInputSchema = getSuitesSchema;
export const getSuiteInputSchema = getSuiteSchema;
export const addSuiteInputSchema = addSuiteSchema;
export const updateSuiteInputSchema = updateSuiteSchema;
export const deleteSuiteInputSchema = deleteSuiteSchema;

// Extract input types
export type GetSuitesInput = z.infer<typeof getSuitesInputSchema>;
export type GetSuiteInput = z.infer<typeof getSuiteInputSchema>;
export type AddSuiteInput = z.infer<typeof addSuiteInputSchema>;
export type UpdateSuiteInput = z.infer<typeof updateSuiteInputSchema>;
export type DeleteSuiteInput = z.infer<typeof deleteSuiteInputSchema>;

// -----------------------------------------------
// Response schema definitions migrated from types.ts
// -----------------------------------------------

/**
 * TestRail API Response for Suite
 */
export const TestRailSuiteSchema = z.object({
	id: z.number(),
	name: z.string(),
	description: z.string().nullable(),
	project_id: z.number(),
	is_master: z.boolean(),
	is_baseline: z.boolean(),
	is_completed: z.boolean(),
	completed_on: z.number().nullable(),
	url: z.string(),
});
export type TestRailSuite = z.infer<typeof TestRailSuiteSchema>;
