using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Eshop.Repository.Migrations
{
    public partial class score1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_UserVoteComment_AspNetUsers_UserId",
                table: "UserVoteComment");

            migrationBuilder.DropForeignKey(
                name: "FK_UserVoteComment_Comments_CommentId",
                table: "UserVoteComment");

            migrationBuilder.DropPrimaryKey(
                name: "PK_UserVoteComment",
                table: "UserVoteComment");

            migrationBuilder.RenameTable(
                name: "UserVoteComment",
                newName: "UserVotes");

            migrationBuilder.RenameIndex(
                name: "IX_UserVoteComment_UserId",
                table: "UserVotes",
                newName: "IX_UserVotes_UserId");

            migrationBuilder.RenameIndex(
                name: "IX_UserVoteComment_CommentId",
                table: "UserVotes",
                newName: "IX_UserVotes_CommentId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_UserVotes",
                table: "UserVotes",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_UserVotes_AspNetUsers_UserId",
                table: "UserVotes",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_UserVotes_Comments_CommentId",
                table: "UserVotes",
                column: "CommentId",
                principalTable: "Comments",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_UserVotes_AspNetUsers_UserId",
                table: "UserVotes");

            migrationBuilder.DropForeignKey(
                name: "FK_UserVotes_Comments_CommentId",
                table: "UserVotes");

            migrationBuilder.DropPrimaryKey(
                name: "PK_UserVotes",
                table: "UserVotes");

            migrationBuilder.RenameTable(
                name: "UserVotes",
                newName: "UserVoteComment");

            migrationBuilder.RenameIndex(
                name: "IX_UserVotes_UserId",
                table: "UserVoteComment",
                newName: "IX_UserVoteComment_UserId");

            migrationBuilder.RenameIndex(
                name: "IX_UserVotes_CommentId",
                table: "UserVoteComment",
                newName: "IX_UserVoteComment_CommentId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_UserVoteComment",
                table: "UserVoteComment",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_UserVoteComment_AspNetUsers_UserId",
                table: "UserVoteComment",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_UserVoteComment_Comments_CommentId",
                table: "UserVoteComment",
                column: "CommentId",
                principalTable: "Comments",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
